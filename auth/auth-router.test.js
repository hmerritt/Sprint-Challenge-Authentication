const request = require("supertest");
const server = require("../api/server");

// Test data
const testUser = [
    { username: "user", password: "pass" },
];

describe("auth", () => {
    describe("POST: /login", () => {
        it("returns JSON type", async () => {
            const res = await request(server).post("/api/auth/login");
            expect(res.type).toBe("application/json");
        });

        it("returns 401 when no body sent", async () => {
            const res = await request(server).post("/api/auth/login");
            expect(res.status).toBe(400);
        });

        it("returns 401 when invalid body sent", async () => {
            const res = await request(server).post("/api/auth/login", {notUsername: "bla", notPassword: "bla"});
            const res2 = await request(server).post("/api/auth/login", {username: "bla", notPassword: "bla"});
            const res3 = await request(server).post("/api/auth/login", {notUsername: "bla", password: "bla"});
            expect(res.status).toBe(400);
            expect(res2.status).toBe(400);
            expect(res3.status).toBe(400);
        });
    });
});
