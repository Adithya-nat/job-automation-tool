const { fetchJobsFromJujuAPI } = require("../services/jobAggregatorService");
jest.mock("axios");
const axios = require("axios");

describe("Job Aggregator Service", () => {
    // it("should fetch jobs and return an array of job objects", async () => {
    //     const mockData = `
    //         <ul class="job_results">
    //             <li>
    //                 <dl class="job">
    //                     <dt>
    //                         <a title="Test Job" href="https://example.com">Test Job</a>
    //                     </dt>
    //                     <dd class="company">
    //                         Test Company <span>(Test Location)</span>
    //                     </dd>
    //                 </dl>
    //             </li>
    //         </ul>
    //     `;
    //     axios.get.mockResolvedValue({ data: mockData });

    //     const result = await fetchJobsFromJujuAPI("test", "location", "category", 1);
    //     expect(result).toEqual([
    //         {
    //             title: "Test Job",
    //             company: "Test Company",
    //             location: "Test Location",
    //             link: "https://example.com",
    //         },
    //     ]);
    // });

    // it("should throw an error if the API call fails", async () => {
    //     axios.get.mockRejectedValue(new Error("API error"));

    //     await expect(fetchJobsFromJujuAPI("test", "location", "category", 1)).rejects.toThrow(
    //         "Failed to fetch jobs from Juju API"
    //     );
    // });
});
