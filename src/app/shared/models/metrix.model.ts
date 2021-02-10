import { ApiResponse } from "./general.model";

export class Goal {
  goalId?: number;
  name!: string;
  description!: string;
  frequency!: number;
  createdDate?: Date;
  updates?: GoalUpdate[];
}

export class GoalUpdate {
  updateId?: string;
  description!: string;
  rating!: number;
  createdDate?: Date;
}

export class FetchGoalResponse implements ApiResponse {
  message: string;
  goals: Goal[];
}
