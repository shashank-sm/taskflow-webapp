import { ClipboardList } from "lucide-react";

export default function EmptyState({ message = "No tasks in this stage." }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/55 px-4 text-center">
      <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-400">
        <ClipboardList size={22} />
      </span>
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

