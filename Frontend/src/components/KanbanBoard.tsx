import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import TaskModal from "./TaskModal";
import Header from "./Header";
import Toolbar from "./Toolbar";
import { Task, TaskStatus, Priority, Severity } from "../types/Task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

/* ================= COLUMNS ================= */
const COLUMNS = [
  { key: "todo", title: "To Do" },
  { key: "inProgress", title: "In Progress" },
  { key: "onHold", title: "On Hold" },
  { key: "completed", title: "Completed" },
] as const;

/* ================= DRAG RULES ================= */
const canMove = (from: TaskStatus, to: TaskStatus) => {
  if (from === "todo" && to === "inProgress") return true;
  if (from === "inProgress" && (to === "onHold" || to === "completed"))
    return true;
  if (from === "onHold" && to === "inProgress") return true;
  return false;
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  /* ================= LOAD TASKS ================= */
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err: any) {
        console.error("GET TASKS ERROR", err);
        if (err?.response?.status === 403) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }
    };
    loadTasks();
  }, []);

  /* ================= DRAG END ================= */
  const onDragEnd = (r: DropResult) => {
    if (!r.destination) return;

    const taskId = Number(r.draggableId);
    const newStatus = r.destination.droppableId as TaskStatus;

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    if (!canMove(task.status, newStatus)) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );

    updateTask(taskId.toString(), { status: newStatus }).catch(() =>
      console.error("UPDATE FAILED")
    );
  };

  /* ================= SAVE TASK ================= */
  const saveTask = async (
    title: string,
    description: string,
    priority: Priority,
    severity: Severity,
    startDate?: string,
    dueDate?: string
  ) => {
    try {
      if (editTask) {
        const updated = await updateTask(editTask.id.toString(), {
          title,
          description,
          priority,
          severity,
          startDate,
          dueDate,
        });

        setTasks((p) =>
          p.map((t) => (t.id === editTask.id ? updated : t))
        );
      } else {
        const created = await createTask(
          title,
          description,
          "todo",
          priority,
          severity,
          startDate,
          dueDate
        );

        setTasks((p) => [...p, created]);
      }
    } catch (err) {
      console.error("SAVE ERROR", err);
    }

    setOpen(false);
    setEditTask(null);
  };

  return (
    <>
      <Header />

      <Toolbar
        onAdd={() => {
          setEditTask(null);
          setOpen(true);
        }}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {COLUMNS.map((c) => (
            <Column
              key={c.key}
              status={c.key}
              title={c.title}
              tasks={tasks.filter((t) => t.status === c.key)}
              onAdd={() => {
                setEditTask(null);
                setOpen(true);
              }}
              onEdit={(t) => {
                setEditTask(t);
                setOpen(true);
              }}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        open={open}
        initialTitle={editTask?.title ?? ""}
        initialDescription={editTask?.description ?? ""}
        initialPriority={editTask?.priority}
        initialSeverity={editTask?.severity}
        initialStartDate={editTask?.startDate}
        initialDueDate={editTask?.dueDate}
        onSave={saveTask}
        onClose={() => {
          setOpen(false);
          setEditTask(null);
        }}
      />

      {deleteId !== null && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Delete Task</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                onClick={async () => {
                  await deleteTask(deleteId.toString());
                  setTasks((p) =>
                    p.filter((t) => t.id !== deleteId)
                  );
                  setDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}