import { CalendarDays, Pencil, Trash2 } from "lucide-react";

export default function TaskCard({ task, onEdit, onDelete, onStageChange, onDragStart }) {
  const createdDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(task.createdAt));

  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, task)}
      className="group cursor-grab rounded-2xl border border-slate-100 bg-white p-4 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words text-base font-semibold text-slate-900">{task.title}</h3>
        <div className="flex shrink-0 gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            aria-label="Edit task"
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            aria-label="Delete task"
            onClick={() => onDelete(task._id)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
        {task.description || "No description provided."}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
        <CalendarDays size={14} />
        <span>{createdDate}</span>
      </div>
      <select
        aria-label={`Change stage for ${task.title}`}
        value={task.stage}
        onChange={(event) => onStageChange(task, event.target.value)}
        className="mt-4 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </article>
  );
}

