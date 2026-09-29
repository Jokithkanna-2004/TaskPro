import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "../types/Task";

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAdd: () => void;          //  REQUIRED
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function Column({
  title,
  status,
  tasks,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className={`column column-${status}`}>
      <div className="column-header">
        <span>{title}</span>
        <button onClick={onAdd}>+</button>
      </div>

      <Droppable droppableId={status}>
        {(p) => (
          <div
            ref={p.innerRef}
            {...p.droppableProps}
            className="column-tasks"
          >
            {tasks.map((task, i) => (
              <TaskCard
                key={task.id}
                task={task}
                index={i}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {p.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}