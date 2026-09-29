import axios from "axios";
import { Task, TaskStatus, Priority, Severity } from "../types/Task";

const api = axios.create({
  baseURL: "http://localhost:8080/tasks",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("");
  return res.data;
};

//  FIXED: startDate & dueDate ADDED
export const createTask = async (
  title: string,
  description: string,
  status: TaskStatus,
  priority: Priority,
  severity: Severity,
  startDate?: string,
  dueDate?: string
): Promise<Task> => {
  const res = await api.post("", {
    title,
    description,
    status,
    priority,
    severity,
    startDate, //  NOW SENT
    dueDate,   // NOW SENT
  });
  return res.data;
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const res = await api.put(`/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/${id}`);
};