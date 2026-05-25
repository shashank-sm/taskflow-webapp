import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await register(form);
      toast.success("Account created. Welcome to TaskFlow!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start organizing work in just a moment.">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
            Full name
          </label>
          <div className="relative">
            <UserRound className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              id="name"
              autoComplete="name"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Your name"
              className="form-input pl-11"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
              className="form-input pl-11"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              id="password"
              type="password"
              minLength={6}
              autoComplete="new-password"
              required
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="At least 6 characters"
              className="form-input pl-11"
            />
          </div>
        </div>
        <button type="submit" className="primary-button w-full" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
          {!submitting && <ArrowRight size={18} />}
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-indigo-600 transition hover:text-indigo-700">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

