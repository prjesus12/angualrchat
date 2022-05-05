using System.ComponentModel.DataAnnotations;

namespace angualrchat.Areas.Identity.Data
{
    public class MensajeDb
    {
        [Key]
        public int IdMensaje { get; set; }
        public string? Mensaje { get; set; }

        public string? IdUser { get; set; }

        public string? UserName { get; set; }

        public DateTime CreatedDate { get; set; }

    }
}
