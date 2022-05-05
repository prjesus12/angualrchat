#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using angualrchat.Areas.Identity.Data;
using angualrchat.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace angualrchat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MensajeDbsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public MensajeDbsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/MensajeDbs
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MensajeDb>>> GetMensaje(string token)
        {
            if(token != null)
            {
                var result = await _userManager.FindByIdAsync(token);
                if (result != null)
                {
                    if(result.Id == token)
                    {
                        return await _context.Mensaje.Take(30).OrderByDescending(c => c.CreatedDate).ToListAsync();
                    }
                    return Ok(new Response { Status = "401", Message = "Unathorized Access" });
                }
                return Ok(new Response { Status = "401", Message = "Unathorized Access" });
            }
            else
            {
                return Ok(new Response { Status = "401", Message = "Unathorized Access" });
            }
            
        }

        // GET: api/MensajeDbs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MensajeDb>> GetMensajeDb(int id)
        {
            var mensajeDb = await _context.Mensaje.FindAsync(id);

            if (mensajeDb == null)
            {
                return NotFound();
            }

            return mensajeDb;
        }

        // PUT: api/MensajeDbs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMensajeDb(int id, MensajeDb mensajeDb)
        {
            if (id != mensajeDb.IdMensaje)
            {
                return BadRequest();
            }

            _context.Entry(mensajeDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MensajeDbExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MensajeDbs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MensajeDb>> PostMensajeDb(MensajeDb mensajeDb)
        {
            MensajeDb msg = new MensajeDb() 
            { 
                Mensaje = mensajeDb.Mensaje, IdUser = mensajeDb.IdUser, 
                CreatedDate = mensajeDb.CreatedDate, UserName = mensajeDb.UserName
            };
            _context.Mensaje.Add(msg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMensajeDb", new { id = mensajeDb.IdMensaje }, msg);
        }

        // DELETE: api/MensajeDbs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMensajeDb(int id)
        {
            var mensajeDb = await _context.Mensaje.FindAsync(id);
            if (mensajeDb == null)
            {
                return NotFound();
            }

            _context.Mensaje.Remove(mensajeDb);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MensajeDbExists(int id)
        {
            return _context.Mensaje.Any(e => e.IdMensaje == id);
        }
    }
}
