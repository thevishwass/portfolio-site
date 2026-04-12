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

const SKILLS = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Vite"] },
  { category: "Backend", items: ["FastAPI", "Node.js", "Express", "SQLAlchemy", "REST APIs"] },
  { category: "AI / ML", items: ["LangChain", "Pinecone", "Gemini API", "DeepSeek", "RAG", "Embeddings"] },
  { category: "Databases", items: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"] },
  { category: "DevOps", items: ["Docker", "Git", "GitHub Actions", "Linux"] },
  { category: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++"] },
];

export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <section
      id="skills"
      ref={ref}
      className={`relative bg-[#000000] text-white py-28 px-6 md:px-12 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* subtle glow background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,255,120,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          Skills
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Technologies
          <br />
          <span className="text-[#a8ff78]">I work with.</span>
        </h2>

        {/* Skill grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {SKILLS.map((group, i) => (
            <div
              key={group.category}
              className={`group bg-[#0f0f0f] border border-white/10 rounded-xl p-6 transition-all duration-500 hover:border-[#a8ff78]/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white group-hover:text-[#a8ff78] transition">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">

                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 hover:bg-[#a8ff78]/10 hover:border-[#a8ff78]/40 hover:text-white transition"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>
          ))}

        </div>

        {/* bottom note */}
        <p className="mt-16 text-sm text-gray-500">
          Always learning — currently exploring cloud architecture and LLM systems.
        </p>

      </div>
    </section>
  );
}