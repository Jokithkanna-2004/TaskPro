import { Task } from "../types/Task";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

interface Props {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, index, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  const createdDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const startDate = task.startDate
    ? new Date(task.startDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "";

  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "";

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(p) => (
        <div
          ref={p.innerRef}
          {...p.draggableProps}
          {...p.dragHandleProps}
          className="task-card"
        >
          {/* ===== MENU ===== */}
          <div className="task-menu">
            <button
              className="menu-btn"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
            >
              ⋮
            </button>

            {open && (
              <div
                className="menu-box"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  onClick={() => {
                    setOpen(false);
                    onEdit(task);
                  }}
                >
                  Edit
                </div>

                <div
                  onClick={() => {
                    setOpen(false);
                    onDelete(task.id);
                  }}
                >
                  Delete
                </div>
              </div>
            )}
          </div>

          {/* ===== BODY ===== */}
          <div className="task-content">
            {/* TITLE */}
            <div className="task-title">{task.title}</div>

            {/* DESCRIPTION */}
            {task.description && (
              <div className="task-description">
                {task.description}
              </div>
            )}

            {/* ===== DATES (ONE LINE) ===== */}
            <div className="task-dates">
              {startDate && (
                <span className="date-text">
                   Start: {startDate}
                </span>
              )}

              {dueDate && (
                <span
                  className={`date-text ${
                    isOverdue ? "overdue" : ""
                  }`}
                >
                   Due: {dueDate}
                </span>
              )}
            </div>

            {/* ===== TAGS (LEFT / RIGHT) ===== */}
            <div className="task-tags">
              {task.priority && (
                <span className={`badge priority-${task.priority}`}>
                  {task.priority}
                </span>
              )}

              {task.severity && (
                <span className={`badge severity-${task.severity}`}>
                  {task.severity}
                </span>
              )}
            </div>
          </div>

          {/* ===== CREATED DATE (SMALL) ===== */}
          {createdDate && (
            <div className="task-created">
              Created: {createdDate}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}