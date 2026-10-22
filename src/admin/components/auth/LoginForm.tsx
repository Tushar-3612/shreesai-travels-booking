"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiShield,
  FiStar,
  FiClock,
} from "react-icons/fi";
import { FaCarSide } from "react-icons/fa6";
import { loginRequest } from "../../lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const result = await loginRequest(email, password);
    setBusy(false);
    if (!result.ok) {
      setError(result.error || "Invalid email or password");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="grid lg:grid-cols-2 w-full max-w-5xl bg-white rounded-[28px] shadow-2xl shadow-slate-900/15 overflow-hidden border border-slate-200">
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/40">
                <FaCarSide size={20} />
              </div>
              <div>
                <p className="font-extrabold text-lg leading-tight">
                  Sai Vaishnavi Tours and Travels
                </p>
                <p className="text-xs text-blue-300 font-semibold">Admin Panel</p>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold leading-snug mb-4">
              Manage your car rental business from one place.
            </h1>
            <p className="text-blue-200/80 text-sm leading-relaxed mb-10">
              Bookings, packages, vehicles, reviews, gallery and website
              settings - everything under your control.
            </p>
            <ul className="space-y-3.5">
              {[
                { icon: FiShield, text: "JWT protected admin routes" },
                { icon: FiClock, text: "Real-time booking management" },
                { icon: FiStar, text: "Reviews moderation & features" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-blue-100/90">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.icon size={15} className="text-blue-300" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <p className="relative text-[11px] text-blue-300/70">
            Authorized personnel only. All sessions are logged securely.
          </p>
        </div>

        <div className="p-8 sm:p-12">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30 text-white">
              <FaCarSide size={20} />
            </div>
            <div>
              <p className="font-extrabold text-lg leading-tight text-slate-900">
                Sai Vaishnavi Tours and Travels
              </p>
              <p className="text-xs text-blue-600 font-semibold">Admin Panel</p>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mb-1.5">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Sign in to continue to the admin dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="adm-label">Email</label>
              <div className="relative">
                <FiMail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shirdicarrental.com"
                  className="adm-inp pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="adm-label">Password</label>
              <div className="relative">
                <FiLock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="adm-inp pl-10 pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="adm-btn adm-btn-primary w-full justify-center py-3.5 text-base"
            >
              {busy ? <FiLoader size={18} className="animate-spin" /> : null}
              {busy ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 mt-8 text-center leading-relaxed">
            Protected by JWT authentication. Sessions expire after 8 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
