using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRM_Solution.Models;
using MongoDB.Driver;
using System.Diagnostics;
using static CRM_Solution.Controllers.ProductsController;



namespace CRM_Solution.Controllers
{

    [Route("api/products")]
    [ApiController]

    public class ProductsController : ControllerBase
    {

        private readonly productRepository _productRepository;

        public ProductsController()
        {
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
            var databaseName = "crmdata";
            var collectionName = "products";

            _productRepository = new productRepository(connectionString, databaseName, collectionName);
        }


        //productsRepository
        public class productRepository
        {
            private readonly IMongoCollection<Product> _products;

            public productRepository(string connectionString, string databaseName, string collectionName)
            {
                var client = new MongoClient(connectionString);
                var database = client.GetDatabase(databaseName);
                _products = database.GetCollection<Product>(collectionName);
            }


            public async Task<List<Product>> Getproducts() =>
                await _products.Find(_ => true).ToListAsync();

            public async Task<Product?> GetproductById(string id) =>
                await _products.Find(x => x.Id == id).FirstOrDefaultAsync();


            public async Task Addproduct(Product product) =>
                await _products.InsertOneAsync(product);

            public async Task Updateproduct(string id, Product product) =>
                await _products.ReplaceOneAsync(x => x.Id == id, product);

            public async Task Removeproduct(string id) =>
                await _products.DeleteOneAsync(x => x.Id == id);


        }



        // products Endpoints:


        [HttpGet]
        public async Task<List<Product>> Get() =>
            await _productRepository.Getproducts();


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(string id)
        {
            var product = await _productRepository.GetproductById(id);

            if (product is null)
            {
                return NotFound();
            }

            return product;
        }


        [HttpPost]
        public async Task<IActionResult> Post(Product product)
        {
            await _productRepository.Addproduct(product);

            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Product product)
        {
            var custToBeUpdated = _productRepository.GetproductById(id);

            if (custToBeUpdated is null)
            {
                return NotFound();
            }

            product.Id = custToBeUpdated.Result.Id;

            await _productRepository.Updateproduct(id, product);

            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _productRepository.GetproductById(id);

            if (book is null)
            {
                return NotFound();
            }

            await _productRepository.Removeproduct(id);

            return NoContent();
        }

    }


}












