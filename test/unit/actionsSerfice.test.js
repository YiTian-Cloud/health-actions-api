"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionsService_1 = require("../../src/services/actionsService");
describe("actionsService", () => {
    beforeEach(() => (0, actionsService_1.resetStore)());
    it("creates an action for a member", () => {
        const action = (0, actionsService_1.createAction)("m1", "flu_shot");
        expect(action.memberId).toBe("m1");
        expect(action.type).toBe("flu_shot");
        expect(action.status).toBe("pending");
    });
    it("lists actions for a member", () => {
        (0, actionsService_1.createAction)("m1", "flu_shot");
        (0, actionsService_1.createAction)("m2", "annual_physical");
        const result = (0, actionsService_1.listActions)("m1");
        expect(result).toHaveLength(1);
    });
});
