import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyTask = { title: "", description: "", stage: "todo" };

export default function TaskModal({ open, task, onClose, onSubmit, submitting }) {
  const [form, setForm] = useState(emptyTask);

  useEffect(() => {
    if (open) {
      setForm(task ? { title: task.title, description: task.description, stage: task.stage } : emptyTask);
    }
  }, [open, task]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{task ? "Edit task" : "Create a task"}</h2>
            <p className="mt-1 text-sm text-slate-500">Capture the task and choose its progress stage.</p>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              id="title"
              required
              maxLength={120}
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Design dashboard interactions"
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              maxLength={1000}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Add helpful context and acceptance details..."
              className="form-input resize-none"
            />
          </div>
          <div>
            <label htmlFor="stage" className="mb-2 block text-sm font-semibold text-slate-700">
              Stage
            </label>
            <select
              id="stage"
              value={form.stage}
              onChange={(event) => setForm({ ...form, stage: event.target.value })}
              className="form-input"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button className="primary-button" disabled={submitting}>
              {submitting ? "Saving..." : task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

