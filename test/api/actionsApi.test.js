"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const actionsService_1 = require("../../src/services/actionsService");
describe("Health Actions API", () => {
    beforeEach(() => (0, actionsService_1.resetStore)());
    it("creates an action via API", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/members/member-1/actions")
            .send({ type: "flu_shot" });
        expect(res.status).toBe(201);
        expect(res.body.memberId).toBe("member-1");
    });
    it("lists actions via API", async () => {
        await (0, supertest_1.default)(app_1.default).post("/members/member-1/actions").send({ type: "flu_shot" });
        const res = await (0, supertest_1.default)(app_1.default).get("/members/member-1/actions");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });
});
