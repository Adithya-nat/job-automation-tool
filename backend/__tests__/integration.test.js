const supertest = require("supertest");
const app = require("../server");

describe("API Integration Tests", () => {
    // it("should fetch jobs and analyze descriptions", async () => {
    //     const jobResponse = await supertest(app)
    //         .post("/api/jobs")
    //         .send({ filters: { keywords: ["architect"], locations: ["California"], category: "construction", results: 1 } });

    //     const analysisResponse = await supertest(app)
    //         .post("/api/analyze-job-descriptions")
    //         .send({ jobDescriptions: [jobResponse.body.jobs[0].description] });

    //     expect(analysisResponse.status).toBe(200);
    //     expect(analysisResponse.body).toHaveProperty("analysis");
    // });
});
