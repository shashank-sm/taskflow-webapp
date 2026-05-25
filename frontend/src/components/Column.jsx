import EmptyState from "./EmptyState";
import TaskCard from "./TaskCard";

const styles = {
  todo: {
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700"
  },
  "in-progress": {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700"
  },
  done: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700"
  }
};

export default function Column({
  stage,
  title,
  tasks,
  onEdit,
  onDelete,
  onStageChange,
  onDragStart,
  onDrop,
  isDropTarget,
  onDragEnter,
  onDragLeave
}) {
  return (
    <section
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => onDrop(event, stage)}
      onDragEnter={() => onDragEnter(stage)}
      onDragLeave={onDragLeave}
      className={`min-h-[400px] rounded-3xl border p-4 transition duration-200 ${
        isDropTarget
          ? "border-indigo-300 bg-indigo-50/70 ring-4 ring-indigo-100"
          : "border-slate-200 bg-slate-100/60"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${styles[stage].dot}`} />
          <h2 className="font-semibold text-slate-800">{title}</h2>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[stage].badge}`}>
          {tasks.length}
        </span>
      </div>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStageChange={onStageChange}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </section>
  );
}

