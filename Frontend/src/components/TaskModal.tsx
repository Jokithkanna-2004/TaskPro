import { useEffect, useState } from "react";
import { Priority, Severity } from "../types/Task";

interface Props {
  open: boolean;
  initialTitle: string;
  initialDescription: string;
  initialPriority?: Priority;
  initialSeverity?: Severity;
  initialStartDate?: string;
  initialDueDate?: string;
  onSave: (
    title: string,
    description: string,
    priority: Priority,
    severity: Severity,
    startDate?: string,
    dueDate?: string
  ) => void;
  onClose: () => void;
}

export default function TaskModal({
  open,
  initialTitle,
  initialDescription,
  initialPriority = "medium",
  initialSeverity = "minor",
  initialStartDate,
  initialDueDate,
  onSave,

  onClose,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [severity, setSeverity] = useState<Severity>("minor");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPriority(initialPriority);
    setSeverity(initialSeverity);
    setStartDate(initialStartDate ?? "");
    setDueDate(initialDueDate ?? "");
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal modal-lg">
        <h3 className="modal-title">
          {initialTitle ? "Edit Task" : "Create Task"}
        </h3>

        <label className="field-label">Task Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="field-label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="row">
          <div>
            <label className="field-label">Start Date</label>
            <input
              className="input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="field-label">Due Date</label>
            <input
              className="input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label className="field-label">Priority</label>
            <select
              className="select"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Priority)
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="field-label">Severity</label>
            <select
              className="select"
              value={severity}
              onChange={(e) =>
                setSeverity(e.target.value as Severity)
              }
            >
              <option value="minor">Minor</option>
              <option value="major">Major</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={() =>
              onSave(
                title,
                description,
                priority,
                severity,
                startDate,
                dueDate
              )
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}