using BackEnd.Models;

namespace BackEnd.Data_Access
{
    public class BookCategory:ModelBase
    {
        public string Category { get; set; } = string.Empty;
        public string SubCategory { get; set; } = string.Empty;
    }
}
