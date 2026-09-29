export type TaskStatus =
  | "todo"
  | "inProgress"
  | "onHold"
  | "completed";

export type Priority = "low" | "medium" | "high";
export type Severity = "minor" | "major" | "critical";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;

  priority?: Priority;
  severity?: Severity;

  startDate?: string;   //  NEW
  dueDate?: string;

  createdAt?: string;
}