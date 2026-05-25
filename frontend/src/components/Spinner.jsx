export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-slate-500">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

