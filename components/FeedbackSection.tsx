"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Feedback {
    id: string;
    name: string;
    service: string;
    rating: number;
    comment: string;
    created_at: string;
}

interface FeedbackSectionProps {
    initialFeedbacks?: Feedback[];
}

const SERVICES = [
    "HelpDesk",
    "Suporte Técnico",
    "Montagem e Manutenção",
    "Desenvolvimento Web",
    "Outro",
];

function StarRating({
    value,
    onChange,
    readonly = false,
}: {
    value: number;
    onChange?: (v: number) => void;
    readonly?: boolean;
}) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    onClick={() => onChange?.(star)}
                    onMouseEnter={() => !readonly && setHovered(star)}
                    onMouseLeave={() => !readonly && setHovered(0)}
                    className={`text-2xl transition-transform duration-150 ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
                        } ${star <= (hovered || value)
                            ? "text-[#00D4FF] drop-shadow-[0_0_6px_rgba(0,212,255,0.5)]"
                            : "text-white/10"
                        }`}
                    aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}

function TestimonialCard({ fb }: { fb: Feedback }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#0D0D14]/90 backdrop-blur-md rounded-2xl p-6 border border-white/[0.06] flex flex-col gap-3 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        >
            <StarRating value={fb.rating} readonly />
            <p className="text-[#AAAACC] text-sm leading-relaxed italic">
                &ldquo;{fb.comment}&rdquo;
            </p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
                <div>
                    <p className="font-semibold text-sm text-[#F0F0FF]">
                        {fb.name}
                    </p>
                    <p className="text-xs text-[#8888AA] font-mono mt-0.5">
                        {fb.service}
                    </p>
                </div>
                <span className="text-xs text-[#555577] font-mono">
                    {new Date(fb.created_at).toLocaleDateString("pt-BR", {
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
        </motion.div>
    );
}

export default function FeedbackSection({
    initialFeedbacks = [],
}: FeedbackSectionProps) {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
    const [rating, setRating] = useState(0);
    const [name, setName] = useState("");
    const [service, setService] = useState("");
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetch("/api/feedback")
            .then((res) => res.json())
            .then((data) => setFeedbacks(data));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setErrorMsg("Por favor, selecione uma avaliação.");
            return;
        }
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, service, rating, comment }),
            });

            if (!res.ok) throw new Error("Erro ao enviar.");

            const novo: Feedback = await res.json();
            setFeedbacks((prev) => [novo, ...prev]);
            setStatus("success");
            setName("");
            setService("");
            setRating(0);
            setComment("");
        } catch {
            setStatus("error");
            setErrorMsg("Não foi possível enviar. Tente novamente.");
        }
    };

    const avgRating =
        feedbacks.length > 0
            ? feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length
            : 0;

    return (
        <section
            id="feedback"
            className="py-24 px-4 bg-[#0A0A0F] text-[#F0F0FF]"
        >
            <div className="max-w-6xl mx-auto">
                {/* Cabeçalho */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#00D4FF] font-mono">
                        // Avaliações
                    </span>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-[#F0F0FF]">
                        Compartilhe a sua experiência:
                    </h2>
                    {feedbacks.length > 0 && (
                        <p className="mt-3 text-[#8888AA] text-sm">
                            Média de{" "}
                            <span className="font-semibold text-[#00D4FF] drop-shadow-[0_0_8px_rgba(0,212,255,0.3)]">
                                {avgRating.toFixed(1)} ★
                            </span>{" "}
                            com base em {feedbacks.length} avaliação
                            {feedbacks.length > 1 ? "ões" : ""}
                        </p>
                    )}
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Formulário */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-[#0D0D14]/90 backdrop-blur-md rounded-2xl p-8 border border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                    >
                        <h3 className="text-xl font-semibold text-[#F0F0FF] mb-6">
                            Deixe sua avaliação
                        </h3>

                        <AnimatePresence>
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center gap-3 py-10 text-center"
                                >
                                    <span className="text-5xl drop-shadow-[0_0_10px_rgba(0,212,255,0.2)]">🙌</span>
                                    <p className="text-[#00D4FF] font-semibold text-lg">
                                        Obrigado pelo feedback!
                                    </p>
                                    <p className="text-[#8888AA] text-sm">
                                        Seu depoimento já aparece na lista ao lado.
                                    </p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-4 text-sm text-[#00D4FF] opacity-80 hover:opacity-100 underline underline-offset-4 transition"
                                    >
                                        Enviar outra avaliação
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-5"
                                >
                                    {/* Avaliação */}
                                    <div>
                                        <label className="block text-xs font-medium text-[#AAAACC] uppercase font-mono tracking-wider mb-2">
                                            Sua avaliação *
                                        </label>
                                        <StarRating value={rating} onChange={setRating} />
                                    </div>

                                    {/* Nome */}
                                    <div>
                                        <label
                                            htmlFor="fb-name"
                                            className="block text-xs font-medium text-[#AAAACC] uppercase font-mono tracking-wider mb-2"
                                        >
                                            Nome *
                                        </label>
                                        <input
                                            id="fb-name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Como você se chama?"
                                            className="w-full rounded-xl border border-white/[0.08] bg-[#12121A] px-4 py-2.5 text-sm text-[#F0F0FF] placeholder-[#555577] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition"
                                        />
                                    </div>

                                    {/* Serviço */}
                                    <div>
                                        <label
                                            htmlFor="fb-service"
                                            className="block text-xs font-medium text-[#AAAACC] uppercase font-mono tracking-wider mb-2"
                                        >
                                            Serviço utilizado *
                                        </label>
                                        <select
                                            id="fb-service"
                                            required
                                            value={service}
                                            onChange={(e) => setService(e.target.value)}
                                            className="w-full rounded-xl border border-white/[0.08] bg-[#12121A] px-4 py-2.5 text-sm text-[#F0F0FF] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition"
                                        >
                                            <option value="" disabled className="bg-[#0A0A0F] text-[#555577]">
                                                Selecione um serviço
                                            </option>
                                            {SERVICES.map((s) => (
                                                <option key={s} value={s} className="bg-[#0A0A0F] text-[#F0F0FF]">
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Comentário */}
                                    <div>
                                        <label
                                            htmlFor="fb-comment"
                                            className="block text-xs font-medium text-[#AAAACC] uppercase font-mono tracking-wider mb-2"
                                        >
                                            Comentário *
                                        </label>
                                        <textarea
                                            id="fb-comment"
                                            required
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={4}
                                            placeholder="Conte como foi sua experiência..."
                                            className="w-full rounded-xl border border-white/[0.08] bg-[#12121A] px-4 py-2.5 text-sm text-[#F0F0FF] placeholder-[#555577] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition resize-none"
                                        />
                                    </div>

                                    {errorMsg && (
                                        <p className="text-sm text-red-400 font-mono">{errorMsg}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] hover:opacity-90 active:scale-[0.99] disabled:opacity-50 text-[#0A0A0F] font-bold py-3 rounded-xl transition shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                                    >
                                        {status === "loading" ? "Enviando…" : "Enviar avaliação"}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Depoimentos */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col gap-4 max-h-[640px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10"
                    >
                        {feedbacks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-center text-[#555577] border border-dashed border-white/[0.05] rounded-2xl">
                                <span className="text-4xl mb-3 opacity-40">💬</span>
                                <p className="text-sm font-mono">
                                    Nenhuma avaliação ainda. Seja o primeiro!
                                </p>
                            </div>
                        ) : (
                            feedbacks.map((fb) => <TestimonialCard key={fb.id} fb={fb} />)
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}