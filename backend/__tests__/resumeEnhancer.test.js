const supertest = require("supertest");
const app = require("../server"); // Assuming your Express app is exported in app.js

describe("Resume Enhancer API", () => {
    // it("should return an enhanced resume", async () => {
    //     const mockChatGPTResponse = {
    //         analysis: "Key Skills: ... Qualifications: ... Responsibilities: ...",
    //     };
    //     jest.spyOn(axios, "post").mockResolvedValueOnce({ data: mockChatGPTResponse });

    //     const response = await supertest(app)
    //         .post("/api/enhance-resume")
    //         .send({
    //             resume: "Test Resume Content",
    //             jobDescriptions: ["Job Description 1"],
    //         });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty("enhancedResume");
    // });

    // it("should return 400 for invalid inputs", async () => {
    //     const response = await supertest(app)
    //         .post("/api/enhance-resume")
    //         .send({});

    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toBe("Invalid inputs for resume enhancement.");
    // });
});
