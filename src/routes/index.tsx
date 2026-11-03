import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Code, Smartphone, Terminal, Layers, Palette, Cpu, Github, Linkedin, Mail,
  User, GraduationCap, Sparkles, ArrowDown, Send, BookOpen, Menu, X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aasiya Anjum — Engineering Student & Developer" },
      { name: "description", content: "Portfolio of Aasiya Anjum, 2nd-year engineering student building web and mobile apps." },
      { property: "og:title", content: "Aasiya Anjum — Portfolio" },
      { property: "og:description", content: "Engineering student, web developer and app developer." },
    ],
  }),
  component: Index,
});

const roles = ["Engineering Student", "Web Developer", "App Developer"];
const nav = [["home", "Home"], ["academics", "Academics"], ["interests", "Interests"], ["skills", "Skills"], ["contact", "Contact"]];

function useTyping() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = roles[i % roles.length];
    const t = setTimeout(() => {
      if (!del && text === word) return setDel(true);
      if (del && text === "") { setDel(false); setI(i + 1); return; }
      setText(word.slice(0, text.length + (del ? -1 : 1)));
    }, !del && text === word ? 1600 : del ? 45 : 90);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return text;
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <h2 className="reveal mb-12 text-center font-display text-3xl font-bold md:text-4xl">
        <span className="text-neon">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Index() {
  const typed = useTyping();
  const [open, setOpen] = useState(false);
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#home" className="font-display text-xl font-black text-neon">AA</a>
          <nav className="hidden gap-8 md:flex">
            {nav.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">{l}</a>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 px-5 pb-5 md:hidden">
            {nav.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">{l}</a>)}
          </nav>
        )}
      </header>

      <section id="home" className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pt-24 md:grid-cols-2">
        <div className="reveal flex justify-center">
          <div className="relative h-64 w-64 md:h-80 md:w-80">
            <div className="animate-spin-slow absolute -inset-3 rounded-full bg-neon opacity-60 blur-xl" />
            <div className="animate-pulse-ring relative flex h-full w-full items-center justify-center rounded-full border-2 border-primary bg-muted">
              <User className="h-28 w-28 text-primary/60" strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className="reveal text-center md:text-left">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-primary">Welcome to my universe</p>
          <h1 className="font-display text-4xl font-black leading-tight md:text-6xl">
            Hi, I'm <span className="text-neon">Aasiya Anjum</span>
          </h1>
          <p className="mt-6 h-8 font-display text-xl text-secondary md:text-2xl">
            {typed}<span className="animate-caret text-primary">|</span>
          </p>
          <a href="#academics" className="mt-10 inline-flex items-center gap-2 rounded-full bg-neon px-8 py-4 font-semibold text-primary-foreground glow-cyan transition-transform duration-300 hover:scale-105 active:scale-95">
            Explore My Universe <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Section id="academics" title="Academic Journey">
        <div className="reveal glass relative mx-auto max-w-3xl rounded-3xl p-8 md:p-12 hover-glow">
          <span className="absolute -top-4 right-6 inline-flex items-center gap-2 rounded-full bg-neon px-4 py-1.5 text-xs font-semibold text-primary-foreground glow-pink">
            <span className="h-2 w-2 animate-ping rounded-full bg-primary-foreground" /> Year 2 in Progress
          </span>
          <div className="flex items-center gap-4">
            <GraduationCap className="h-12 w-12 text-primary" />
            <div>
              <h3 className="font-display text-2xl font-bold">Engineering Student</h3>
              <p className="text-muted-foreground">Bachelor of Engineering · 2nd Year</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              [Sparkles, "Focus Areas", ["Web Development", "App Development", "UI Engineering"]],
              [BookOpen, "Modules", ["Data Structures", "OOP", "Database Systems"]],
              [Cpu, "Foundations", ["Programming in C", "Discrete Maths", "Computer Networks"]],
            ].map(([Icon, t, items]: any) => (
              <div key={t}>
                <Icon className="mb-2 h-5 w-5 text-secondary" />
                <h4 className="mb-2 font-semibold">{t}</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">{items.map((x: string) => <li key={x}>› {x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="interests" title="Interests & Passions">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [Code, "Web Development", "Crafting fast, responsive websites with modern frameworks."],
            [Smartphone, "App Development", "Building smooth cross-platform mobile experiences."],
            [Terminal, "Problem Solving", "Sharpening logic through code challenges and scripts."],
            [Palette, "UI / UX Design", "Designing interfaces that feel as good as they look."],
            [Layers, "Full-Stack Projects", "Connecting front ends to real data and APIs."],
            [Cpu, "Emerging Tech", "Exploring AI tools and what's next in software."],
          ].map(([Icon, t, d]: any, i) => (
            <div key={t} className="reveal glass rounded-2xl p-7 hover-glow">
              <Icon className={`mb-4 h-10 w-10 ${i % 2 ? "text-secondary" : "text-primary"}`} />
              <h3 className="mb-2 font-display text-lg font-bold">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Tech Stack & Skills">
        <div className="reveal glass mx-auto max-w-3xl space-y-6 rounded-3xl p-8 md:p-10">
          {[["HTML / CSS", 90], ["JavaScript", 80], ["React", 72], ["Flutter", 65], ["Mobile UI", 75]].map(([n, v]) => (
            <div key={n as string}>
              <div className="mb-2 flex justify-between text-sm"><span>{n}</span><span className="text-primary">{v}%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-neon glow-cyan" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 pt-4">
            {["Git", "Tailwind", "Dart", "Firebase", "Figma", "Node.js"].map((t) => (
              <span key={t} className="rounded-full border border-primary/40 px-4 py-1.5 text-sm text-primary transition-shadow hover:glow-cyan">{t}</span>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" title="Get In Touch">
        <ContactForm />
        <div className="reveal mt-12 flex justify-center gap-6">
          {[[Github, "https://github.com", "GitHub"], [Linkedin, "https://linkedin.com", "LinkedIn"], [Mail, "mailto:hello@example.com", "Email"]].map(([Icon, href, l]: any) => (
            <a key={l} href={href} target="_blank" rel="noreferrer" aria-label={l} className="glass flex h-14 w-14 items-center justify-center rounded-full text-primary transition-all duration-300 hover:scale-125 hover:glow-pink hover:text-secondary">
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Aasiya Anjum. Crafted in the Digital Realm.
      </footer>
    </div>
  );
}

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function ContactForm() {
  const field = "glass w-full rounded-xl px-5 py-4 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:glow-cyan";
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) return toast.error(r.error.issues[0].message);
    toast.success("Message sent! I'll get back to you soon.");
    e.currentTarget.reset();
  };
  return (
    <form onSubmit={onSubmit} className="reveal mx-auto max-w-xl space-y-5">
      <input name="name" placeholder="Your Name" maxLength={100} className={field} />
      <input name="email" type="email" placeholder="Your Email" maxLength={255} className={field} />
      <textarea name="message" rows={5} placeholder="Your Message" maxLength={1000} className={field} />
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon py-4 font-semibold text-primary-foreground glow-pink transition-transform hover:scale-[1.02] active:scale-95">
        Send Message <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
