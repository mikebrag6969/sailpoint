
using API.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace API.Data
{
    public class DataAccess
    {
        private readonly string _connectionString;

        public DataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }


        public async Task<List<AppCity>> fetchCitiesStartWith(string searchText, int PageNumber, int PageSize)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_fetchCitiesStartWith", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@SearchText", searchText));
                    cmd.Parameters.Add(new SqlParameter("@PageNumber", PageNumber));
                    cmd.Parameters.Add(new SqlParameter("@PageSize", PageSize));

                    
                    var response = new List<AppCity>();
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToValue(reader));
                        }
                    }
                    return response;
                }
            }
        }



        private AppCity MapToValue(SqlDataReader reader)
        {
            return new AppCity()
            {

                CityName = reader["CityName"].ToString(),
                Country = reader["Country"].ToString()
            };
        }

    }
}