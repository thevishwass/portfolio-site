import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold });

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

interface ExperienceItem {
  type: string;
  period: string;
  role: string;
  org: string;
  description: string;
  tags?: string[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    type: "Achievement",
    period: "2024",
    role: "Eureka Ideathon — Winner",
    org: "IIT Bombay E-Cell",
    description:
      "Won the flagship ideathon at IIT Bombay's Entrepreneurship Cell competing against teams across India with a technology-driven product idea.",
    tags: ["Entrepreneurship", "Product", "IIT Bombay"],
  },
  {
    type: "Education",
    period: "2022 – 2026",
    role: "B.E. Electronics & Telecommunication Engineering",
    org: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    description:
      "Final-year undergraduate focusing on software systems, embedded hardware, and communication networks while building full-stack and AI projects.",
    tags: ["EXTC", "Embedded Systems", "Signal Processing"],
  },
];

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      ref={ref}
      className={`relative bg-[#050505] text-white py-28 px-6 md:px-12 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,255,120,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          Experience
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Education &
          <br />
          <span className="text-[#a8ff78]">achievements.</span>
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {EXPERIENCE.map((item, i) => (
            <div
              key={item.role}
              className={`group bg-[#0f0f0f] border border-white/10 rounded-xl p-7 transition-all duration-500 hover:border-[#a8ff78]/40 hover:shadow-[0_12px_50px_rgba(0,0,0,0.7)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >

              {/* meta row */}
              <div className="flex items-center justify-between mb-4">

                <span className="text-[11px] tracking-widest uppercase text-[#a8ff78]">
                  {item.type}
                </span>

                <span className="text-[12px] text-white/30">
                  {item.period}
                </span>

              </div>

              {/* title */}
              <h3 className="text-[20px] font-bold text-white mb-1 group-hover:text-[#a8ff78] transition">
                {item.role}
              </h3>

              {/* organization */}
              <p className="text-[13px] text-[#a8ff78]/60 mb-4">
                {item.org}
              </p>

              {/* description */}
              <p className="text-[14px] text-white/35 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* tags */}
              {item.tags && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] text-white/30 border border-white/[0.08] rounded-md hover:border-[#a8ff78]/40 hover:text-white/80 transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))}

        </div>

        {/* Footer */}
        <p className="mt-16 text-sm text-gray-500">
          Final year — more milestones coming soon.
        </p>

      </div>
    </section>
  );
}