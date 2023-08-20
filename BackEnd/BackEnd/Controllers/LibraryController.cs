using BackEnd.Data_Access;
using BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly IDataAccess _library;
        private readonly IConfiguration _configuration;
        public LibraryController(IDataAccess library, IConfiguration configuration)
        {
            _library = library;
            _configuration = configuration;
        }
        [HttpPost("CreateAccount")]
        public IActionResult CreateAccount(User user)
        {
            if (!_library.IsEmailAvailable(user.Email))
            {
                return Ok("Email is not available");
            }
            user.CreatedOn = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            user.UserType = UserType.USER;
            _library.CreateUser(user);
            return Ok("Account Created Successfully!");
        }

        [HttpGet("Login")]
        public IActionResult Login(string email, string password)
        {
            if (_library.AuthenticateUser(email, password, out User? user))
            {
                if (user != null)
                {
                    var jwt = new Jwt(_configuration["Jwt:Key"], _configuration["Jwt: Duration"]);
                    var token = jwt.GenerateToken(user);
                    return Ok(token);
                }
            }

            return Ok("Invalid");
        }

        [HttpGet("GetAllBooks")]
        public IActionResult GetAllBooks()
        {
            var books = _library.GetAllBooks();
            var bookToSend = books.Select(book => new
            {
                book.Id,
                book.Title,
                book.Category.Category,
                book.Category.SubCategory,
                book.Price,
                Available = !book.Ordered,
                book.Author

            }).ToList();
            return Ok(bookToSend);
        }

        [HttpGet("OrderBook/{userId}/{bookId}")]
        public IActionResult OrderBook(int userId, int bookId)
        {
            var result = _library.OrderBook(userId, bookId) ? "success" : "fail";
            return Ok(result);
        }
        [HttpGet("GetOrders/{id}")]
        public IActionResult GetOrders(int id)
        {
            return Ok(_library.GetOrdersOfUser(id));
        }

        [HttpGet("GetAllOrders")]
        public IActionResult GetAllOrders()
        {
            return Ok(_library.GetAllOrders());
        }
        [HttpGet("ReturnBook/{bookId}/{userId}")]
        public IActionResult ReturnBook(string bookId, string userId)
        {
            var result = _library.ReturnBook(int.Parse(userId), int.Parse(bookId));
            return Ok(result == true ? "success" : "not returned");
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _library.GetUsers();
            var result = users.Select(user => new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.Mobile,
                user.Blocked,
                user.Active,
                user.CreatedOn,
                user.UserType,
                user.Fine
            });
            return Ok(result);
        }

        [HttpGet("ChangeBlockStatus/{status}/{id}")]
        public IActionResult ChangeBlockStatus(int status, int id)
        {
            if (status == 1)
            {
                _library.BlockUser(id);
            }
            else
            {
                _library.UnblockUser(id);
            }
            return Ok("success");
        }

        [HttpGet("ChangeEnableStatus/{status}/{id}")]
        public IActionResult ChangeEnableStatus(int status, int id)
        {
            if (status == 1)
            {
                _library.ActivateUser(id);
            }
            else
            {
                _library.DeactivateUser(id);
            }
            return Ok("success");
        }

        [HttpPost("InsertBook")]
        public IActionResult InsertBook(Book book)
        {
            book.Title = book.Title.Trim();
            book.Author = book.Author.Trim();
            book.Category.Category = book.Category.Category.ToLower();
            book.Category.SubCategory = book.Category.SubCategory.ToLower();

            _library.InsertNewBook(book);
            return Ok("Inserted");
        }

        [HttpDelete("DeleteBook")]
        public IActionResult DeleteBook(int id)
        {
            var returnResult = _library.DeleteBook(id) ? "success" : "fail";
            return Ok(returnResult);
        }

        [HttpPost("InsertCategory")]
        public IActionResult InsertCategory(BookCategory category)
        {
            category.Category= category.Category.ToLower(); 
            category.SubCategory= category.SubCategory.ToLower();
            _library.CreateCategory(category);
            return Ok("Inserted");
        }
    }

}
