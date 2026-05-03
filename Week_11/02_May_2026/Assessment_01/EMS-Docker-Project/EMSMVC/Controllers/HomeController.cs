using EMSMVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace EMSMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HomeController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        // GET: List
        public async Task<IActionResult> Index()
        {
            var client = _httpClientFactory.CreateClient("api");
            var employees = await client.GetFromJsonAsync<List<Employee>>("api/employees");

            return View(employees);
        }

        // GET: Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Create
        [HttpPost]
        public async Task<IActionResult> Create(Employee emp)
        {
            var client = _httpClientFactory.CreateClient("api");

            var response = await client.PostAsJsonAsync("api/employees", emp);

            if (response.IsSuccessStatusCode)
                return RedirectToAction("Index");

            return View(emp);
        }

        // GET: Edit
        public async Task<IActionResult> Edit(int id)
        {
            var client = _httpClientFactory.CreateClient("api");

            var emp = await client.GetFromJsonAsync<Employee>($"api/employees/{id}");

            return View(emp);
        }

        // POST: Edit
        [HttpPost]
        public async Task<IActionResult> Edit(Employee emp)
        {
            var client = _httpClientFactory.CreateClient("api");

            var response = await client.PutAsJsonAsync($"api/employees/{emp.Id}", emp);

            if (response.IsSuccessStatusCode)
                return RedirectToAction("Index");

            return View(emp);
        }

        // DELETE
        public async Task<IActionResult> Delete(int id)
        {
            var client = _httpClientFactory.CreateClient("api");

            await client.DeleteAsync($"api/employees/{id}");

            return RedirectToAction("Index");
        }
    }
}