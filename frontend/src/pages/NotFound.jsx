import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-500">The page you requested does not exist.</p>
        <Link to="/dashboard" className="primary-button mt-8">
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}

