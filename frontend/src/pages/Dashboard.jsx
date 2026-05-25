import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Filter, Plus, Search } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Column from "../components/Column";
import Spinner from "../components/Spinner";
import TaskModal from "../components/TaskModal";
import api, { getErrorMessage } from "../services/api";

const columns = [
  { stage: "todo", title: "Todo" },
  { stage: "in-progress", title: "In Progress" },
  { stage: "done", title: "Done" }
];

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [saving, setSaving] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dropTarget, setDropTarget] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/tasks");
      setTasks(data.tasks);
    } catch (requestError) {
      const message = getErrorMessage(requestError);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const visibleTasks = useMemo(() => {
    const query = search.toLowerCase().trim();
    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      const matchesStage = stageFilter === "all" || task.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [tasks, search, stageFilter]);

  const displayedColumns =
    stageFilter === "all" ? columns : columns.filter((column) => column.stage === stageFilter);

  const groupedTasks = displayedColumns.reduce((groups, column) => {
    groups[column.stage] = visibleTasks.filter((task) => task.stage === column.stage);
    return groups;
  }, {});

  const openCreateModal = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const saveTask = async (form) => {
    setSaving(true);

    try {
      if (selectedTask) {
        const { data } = await api.put(`/tasks/${selectedTask._id}`, form);
        setTasks((current) =>
          current.map((task) => (task._id === selectedTask._id ? data.task : task))
        );
        toast.success("Task updated successfully.");
      } else {
        const { data } = await api.post("/tasks", form);
        setTasks((current) => [data.task, ...current]);
        toast.success("Task created successfully.");
      }
      setModalOpen(false);
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Delete this task permanently?")) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((current) => current.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully.");
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    }
  };

  const changeStage = async (task, stage) => {
    if (task.stage === stage) {
      return;
    }

    const previousTasks = tasks;
    setTasks((current) =>
      current.map((currentTask) =>
        currentTask._id === task._id ? { ...currentTask, stage } : currentTask
      )
    );

    try {
      const { data } = await api.put(`/tasks/${task._id}`, { stage });
      setTasks((current) =>
        current.map((currentTask) => (currentTask._id === task._id ? data.task : currentTask))
      );
      toast.success("Task stage updated.");
    } catch (requestError) {
      setTasks(previousTasks);
      toast.error(getErrorMessage(requestError));
    }
  };

  const startDrag = (event, task) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", task._id);
    setDraggedTask(task);
  };

  const dropTask = (event, stage) => {
    event.preventDefault();
    setDropTarget("");
    if (draggedTask) {
      changeStage(draggedTask, stage);
      setDraggedTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-soft-grid [background-size:24px_24px]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <section className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Workspace
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Your tasks</h2>
            <p className="mt-2 text-sm text-slate-500">
              Drag tasks across stages or update them using the stage selector.
            </p>
          </div>
          <button type="button" onClick={openCreateModal} className="primary-button">
            <Plus size={18} />
            New task
          </button>
        </section>
        <section className="mb-7 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-card sm:flex-row">
          <label className="relative flex-1">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
            <span className="sr-only">Search tasks</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title or description..."
              className="form-input py-2.5 pl-10"
            />
          </label>
          <label className="relative sm:w-52">
            <Filter className="absolute left-3.5 top-3 text-slate-400" size={17} />
            <span className="sr-only">Filter stage</span>
            <select
              value={stageFilter}
              onChange={(event) => setStageFilter(event.target.value)}
              className="form-input py-2.5 pl-10"
            >
              <option value="all">All stages</option>
              <option value="todo">Todo only</option>
              <option value="in-progress">In Progress only</option>
              <option value="done">Done only</option>
            </select>
          </label>
        </section>
        {loading ? (
          <Spinner label="Loading your tasks..." />
        ) : error ? (
          <div className="rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-card">
            <AlertCircle className="mx-auto text-rose-500" size={34} />
            <p className="mt-3 font-semibold text-slate-800">Could not load tasks</p>
            <p className="mt-1 text-sm text-slate-500">{error}</p>
            <button type="button" onClick={loadTasks} className="primary-button mt-5">
              Try again
            </button>
          </div>
        ) : (
          <div className={`grid gap-5 ${displayedColumns.length === 1 ? "max-w-md" : "lg:grid-cols-3"}`}>
            {displayedColumns.map((column) => (
              <Column
                key={column.stage}
                {...column}
                tasks={groupedTasks[column.stage]}
                onEdit={openEditModal}
                onDelete={deleteTask}
                onStageChange={changeStage}
                onDragStart={startDrag}
                onDrop={dropTask}
                onDragEnter={setDropTarget}
                onDragLeave={() => setDropTarget("")}
                isDropTarget={dropTarget === column.stage}
              />
            ))}
          </div>
        )}
      </main>
      <TaskModal
        open={modalOpen}
        task={selectedTask}
        onClose={() => setModalOpen(false)}
        onSubmit={saveTask}
        submitting={saving}
      />
    </div>
  );
}

