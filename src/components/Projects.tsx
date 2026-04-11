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

const PROJECTS = [
  {
    title: "AI GitHub Repo Copilot",
    description:
      "RAG-powered chatbot that lets you query GitHub repositories in natural language using Pinecone vector search and DeepSeek LLM.",
    tags: ["React", "FastAPI", "Pinecone", "DeepSeek", "RAG"],
    github: "https://github.com/thevishwass/ai-github-copilot",
    live: "https://your-live-demo-link.com",
  },
  {
    title: "Finance Dashboard Backend",
    description:
      "RESTful API for a personal finance tracker with analytics, JWT authentication and layered architecture.",
    tags: ["FastAPI", "SQLAlchemy", "SQLite", "JWT"],
    github: "https://github.com/thevishwass/finance-dashboard-backend",
    live: null,
  },
  {
    title: "AI Email Sender",
    description:
      "Automated email pipeline powered by Gemini API that generates contextual emails and sends them via SMTP.",
    tags: ["Python", "Gemini API", "SMTP"],
    github: "https://github.com/thevishwass/ai-email-sender",
    live: null,
  },
  {
    title: "Resume Analyzer",
    description:
      "Full-stack tool that analyzes resumes against job descriptions using LLM scoring.",
    tags: ["Next.js", "MongoDB", "Gemini API"],
    github: "https://github.com/thevishwass/resume-analyzer",
    live: "https://your-live-demo-link.com",
  },
];

export default function Projects() {
  const { ref, inView } = useInView();

  return (
    <section
      id="projects"
      ref={ref}
      className={`relative bg-[#050505] text-white py-28 px-6 md:px-12 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* subtle glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,255,120,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          Projects
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Selected
          <br />
          <span className="text-[#a8ff78]">work.</span>
        </h2>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`group bg-[#0f0f0f] border border-white/10 rounded-xl p-6 transition-all duration-500 hover:border-[#a8ff78]/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-[#a8ff78] transition">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 hover:bg-[#a8ff78]/10 hover:border-[#a8ff78]/40 hover:text-white transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* links */}
<div className="flex gap-3 mt-2">

  <a
    href={project.github}
    target="_blank"
    rel="noreferrer"
    className="px-4 py-2 text-sm border border-white/10 rounded-md text-gray-300 hover:border-[#a8ff78] hover:text-white transition"
  >
    GitHub
  </a>

  {project.live && (
    <a
      href={project.live}
      target="_blank"
      rel="noreferrer"
      className="px-4 py-2 text-sm bg-white text-black rounded-md font-medium hover:bg-[#a8ff78] hover:text-black transition"
    >
      Live
    </a>
  )}

</div>

            </div>
          ))}

        </div>

        {/* footer note */}
        <p className="mt-16 text-sm text-gray-500">
          More projects available on my GitHub profile.
        </p>

      </div>
    </section>
  );
}