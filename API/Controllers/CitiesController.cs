using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class CitiesController : ControllerBase
    {

        private readonly DataAccess _dataAccess;

        public CitiesController(DataAccess dataAccess)
        {
            this._dataAccess = dataAccess ?? throw new ArgumentNullException(nameof(dataAccess));
        }

        // GET api/values/5
        [HttpGet("fetchCities")]
        public async Task<ActionResult<IEnumerable<AppCity>>> Get([FromQuery] string searchText, [FromQuery] int PageNumber,  [FromQuery] int PageSize )
        {
            var response = await _dataAccess.fetchCitiesStartWith(searchText,PageNumber,PageSize);
            if (response.Count == 0)
            {
                return new List<AppCity>();
            } else {
                return response;
            }
        }


    }




}