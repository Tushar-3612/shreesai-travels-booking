"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheckCircle, FiStar } from "react-icons/fi";
import { useSiteData } from "@/lib/site";

interface FeedbackFormProps {
  onSubmitted?: () => void;
}

export default function FeedbackForm({ onSubmitted }: FeedbackFormProps) {
  const site = useSiteData();
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const routeOptions = Array.from(
    new Set([
      ...(site?.settings.mostBookedRoutes.map((r) => r.route) ?? []),
      ...(site?.packages.map((p) => p.route) ?? []),
    ])
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/site/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          route: route || "Shirdi Darshan",
          rating,
          text: text.trim(),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      onSubmitted?.();
      setSubmitted(true);
    } catch {
      setError("Could not submit your review right now. Please try again.");
    }
  };

  const reset = () => {
    setName("");
    setRoute("");
    setRating(0);
    setText("");
    setSubmitted(false);
    setError("");
  };

  return (
    <section id="feedback" className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Share Your Experience
          </span>
          <h2 className="section-title mt-2">
            Leave a <span className="gradient-text">Feedback</span>
          </h2>
          <p className="section-subtitle">
            Travelled with us? Tell us about your journey - your review helps
            other pilgrims and travellers choose with confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="rounded-[28px] bg-white border border-border/60 shadow-xl shadow-black/5 p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle size={40} className="text-success" />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-3">
                  Thank You, {name.split(" ")[0] || "Traveller"}!
                </h3>
                <p className="text-text-muted text-lg leading-relaxed mb-8">
                  Your review has been submitted. It will appear on this page
                  and the homepage as soon as it is approved.
                </p>
                <button onClick={reset} className="btn-primary">
                  Write Another Review
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="rounded-[28px] bg-white border border-border/60 shadow-[0_20px_50px_-25px_rgba(37,99,235,0.3)] overflow-hidden"
              >
                <div className="bg-gradient-to-br from-primary to-primary-dark px-8 py-6 text-white">
                  <h3 className="text-xl font-bold">Rate Your Journey</h3>
                  <p className="text-white/75 text-sm mt-1">
                    Your honest feedback keeps our service at its best.
                  </p>
                </div>

                <div className="p-8 sm:p-10 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">
                      Travel Route *
                    </label>
                    <select
                      required
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select your travel route</option>
                      {routeOptions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">
                      Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(i + 1)}
                          onMouseEnter={() => setHovered(i + 1)}
                          onMouseLeave={() => setHovered(0)}
                          aria-label={`Rate ${i + 1} star${i ? "s" : ""}`}
                          className="p-1 transition-transform duration-200 hover:scale-125"
                        >
                          <FiStar
                            size={30}
                            className={`transition-colors duration-200 ${
                              i < (hovered || rating)
                                ? "fill-accent text-accent"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-sm font-semibold text-text-muted">
                        {rating > 0
                          ? `${rating}/5 ${
                              ["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]
                            }`
                          : "Tap a star"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">
                      Review Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Share your experience - driver, car, punctuality, value for money..."
                      className="input-field resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm font-semibold text-rose-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={rating === 0}
                    className="btn-primary w-full justify-center text-lg py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <FiSend size={20} />
                    Submit Review
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
