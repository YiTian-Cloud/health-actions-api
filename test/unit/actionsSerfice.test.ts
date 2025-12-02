import { createAction, listActions, resetStore } from "../../src/services/actionsService";

describe("actionsService", () => {
  beforeEach(() => resetStore());

  it("creates an action for a member", () => {
    const action = createAction("m1", "flu_shot");

    expect(action.memberId).toBe("m1");
    expect(action.type).toBe("flu_shot");
    expect(action.status).toBe("pending");
  });

  it("lists actions for a member", () => {
    createAction("m1", "flu_shot");
    createAction("m2", "annual_physical");

    const result = listActions("m1");
    expect(result).toHaveLength(1);
  });
});
