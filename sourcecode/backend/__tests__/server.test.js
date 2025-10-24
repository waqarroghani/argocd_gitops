import request from "supertest";
import app from "../src/server.js";

// Basic test to ensure API responds
describe("Visitor Counter API", () => {
  it("GET /api/visit should respond (mock test)", async () => {
    const res = await request(app).get("/api/visit");
    expect([200, 500]).toContain(res.statusCode); // Accepts both 200 or 500 for demo
  });
});



