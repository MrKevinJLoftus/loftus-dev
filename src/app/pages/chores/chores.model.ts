export class Chore {
  id?: number;
  description: string;
}

export class Person {
  id?: number;
  name: string;
}

export class ApiCompletedTask extends Chore {
  date_completed: string;
  name: string;
  notes?: string;
}

export class CompletedTask extends Chore {
  dateCompleted: string;
  name: string;
  notes?: string;
}

export class NewTask {
  choreId: number;
  personId: number;
  notes?: string;
}

export class DashboardDataRow {
  choreDesc: string;
  dateCompleted: string;
  worker: string;
  notes: string;
}
