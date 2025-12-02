export type HealthAction = {
    id: string;
    memberId: string;
    type: string;
    status: "pending" | "completed";
  };
  
  const actions: HealthAction[] = [];
  
  export function createAction(memberId: string, type: string): HealthAction {
    const action: HealthAction = {
      id: `${Date.now()}`,
      memberId,
      type,
      status: "pending",
    };
    actions.push(action);
    return action;
  }
  
  export function listActions(memberId: string): HealthAction[] {
    return actions.filter((a) => a.memberId === memberId);
  }
  
  export function resetStore() {
    actions.length = 0;
  }
  