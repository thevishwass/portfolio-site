import { useEffect, useState } from "react";

const ROLES = [
  "Full-Stack Developer",
  "AI Engineer",
  "Backend Developer",
  "Final Year Student",
];

function useTypingEffect(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

export default function Hero() {
  const typed = useTypingEffect(ROLES);

  return (
    <section className="relative min-h-screen bg-[#000000ae] text-white flex items-center px-6 md:px-12">

      {/* subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,255,120,0.01),transparent_60%)]" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT CONTENT */}
        <div>

          <p className="text-lg uppercase tracking-widest text-gray-200 font-bold mb-3">
            This is me
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Vishwas
            <br />
            <span className="text-white/80">Singh</span>
          </h1>

          {/* typed role */}
          <div className="mt-4 text-lg text-[#a8ff78] h-8">
            {typed}
            <span className="animate-pulse text-[#a8ff78]">|</span>
          </div>

          <p className="mt-6 text-gray-400 max-w-md leading-relaxed">
            I design and build modern web applications, backend systems
            and AI-powered tools focused on performance and real-world impact.
          </p>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#projects"
              className="px-6 py-3 bg-[#a8ff78] text-black rounded-md font-medium hover:bg-white transition"
            >
              Explore Projects
            </a>

            <a
              href="https://github.com/thevishwass"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-white/10 rounded-md text-gray-300 hover:border-[#a8ff78] hover:text-white transition"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/vishwassingh15"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-white/10 rounded-md text-gray-300 hover:border-[#a8ff78] hover:text-white transition"
            >
              LinkedIn
            </a>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex justify-center md:justify-end">

          <div className="relative w-[320px] md:w-[420px]">

            {/* glow */}
            <div className="absolute inset-0 bg-[#a8ff78]/10 blur-3xl rounded-3xl"></div>

            <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

              <img
                src="/hero.png"
                alt="profile"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}