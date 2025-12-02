import request from "supertest";
import app from "../../src/app";
import { resetStore } from "../../src/services/actionsService";

describe("Health Actions API", () => {
  beforeEach(() => resetStore());

  it("creates an action via API", async () => {
    const res = await request(app)
      .post("/members/member-1/actions")
      .send({ type: "flu_shot" });

    expect(res.status).toBe(201);
    expect(res.body.memberId).toBe("member-1");
  });

  it("lists actions via API", async () => {
    await request(app).post("/members/member-1/actions").send({ type: "flu_shot" });

    const res = await request(app).get("/members/member-1/actions");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
