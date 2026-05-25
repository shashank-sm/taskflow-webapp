import { CheckCircle2, LayoutDashboard, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: LayoutDashboard, text: "Visual Kanban task management" },
  { icon: ShieldCheck, text: "Private, secure workspace" },
  { icon: CheckCircle2, text: "Simple progress tracking" }
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="relative">
          <p className="text-xl font-bold">TaskFlow</p>
          <h1 className="mt-20 max-w-lg text-5xl font-bold leading-tight">
            Focus on the work that moves forward.
          </h1>
          <p className="mt-6 max-w-md text-lg text-indigo-100">
            A clean workflow board for planning, building and finishing meaningful tasks.
          </p>
        </div>
        <div className="relative space-y-4">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-indigo-50">
              <Icon size={20} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="bg-gradient-to-r from-indigo-700 to-fuchsia-600 bg-clip-text text-2xl font-bold text-transparent">
              TaskFlow
            </p>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}

