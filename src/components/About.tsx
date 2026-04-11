import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const FACTS = [
  { label: "Degree", value: "B.E. Electronics & Telecom" },
  { label: "College", value: "Bharati Vidyapeeth, Navi Mumbai" },
  { label: "Graduating", value: "2026" },
  { label: "Currently Into", value: "Cloud · LLMs · API Security" },
  { label: "Location", value: "Navi Mumbai, India" },
  {
    label: "GitHub",
    value: "@thevishwass",
    href: "https://github.com/thevishwass",
  },
  {
    label: "LinkedIn",
    value: "vishwassingh15",
    href: "https://linkedin.com/in/vishwassingh15",
  },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref}
      className={`relative bg-[#050505] text-white py-28 px-6 md:px-12 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,255,120,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start relative">

        {/* LEFT CONTENT */}
        <div>

          <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
            About
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Building real
            <br />
            <span className="text-[#a8ff78]">software systems.</span>
          </h2>

          <div className="space-y-6 text-gray-400 max-w-lg leading-relaxed">

            <p>
              I'm a final-year Electronics & Telecommunications engineering
              student at Bharati Vidyapeeth, Navi Mumbai. I enjoy building
              scalable backend systems and modern full-stack applications.
            </p>

            <p>
              My work includes developing AI-powered tools, REST APIs,
              RAG pipelines, and clean frontend interfaces using modern
              web technologies.
            </p>

            <p>
              I also won the{" "}
              <span className="text-[#a8ff78] font-medium">
                Eureka Ideathon 2024
              </span>{" "}
              organized by IIT Bombay E-Cell, competing against teams from
              across India.
            </p>

          </div>

        </div>

        {/* RIGHT FACT PANEL */}
        <div className="group bg-[#0f0f0f] border border-white/10 rounded-xl p-8 transition hover:border-[#a8ff78]/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

          <div className="space-y-6">

            {FACTS.map(({ label, value, href }) => (
              <div
                key={label}
                className="flex justify-between items-center border-b border-white/5 pb-3 last:border-none"
              >

                <span className="text-sm text-gray-500">
                  {label}
                </span>

                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-300 hover:text-[#a8ff78] transition"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-sm text-gray-300">
                    {value}
                  </span>
                )}

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}