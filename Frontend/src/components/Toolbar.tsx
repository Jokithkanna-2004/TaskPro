import { Plus } from "lucide-react";

interface Props {
  onAdd: () => void;
}

export default function Toolbar({ onAdd }: Props) {
  return (
    <div className="toolbar" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
      <button className="new-event-button" onClick={onAdd}>
        <Plus size={14} />
        <span>Create Task</span>
      </button>
    </div>
  );
}