import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
const ref = useRef<HTMLDivElement | null>(null);
const [inView, setInView] = useState(false);

useEffect(() => {
const el = ref.current;
if (!el) return;


const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setInView(true);
      observer.disconnect();
    }
  },
  { threshold }
);

observer.observe(el);

return () => observer.disconnect();


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
className={`relative bg-[#000000] text-white py-28 px-6 md:px-12 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
>
{/* glow background */} <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,255,120,0.05),transparent_60%)]" />


  <div className="max-w-7xl mx-auto relative">
    {/* header */}
    <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
      Experience
    </p>

    <h2 className="text-4xl md:text-5xl font-bold mb-16">
      Education &
      <br />
      <span className="text-[#a8ff78]">achievements.</span>
    </h2>

    {/* grid */}
    <div className="grid md:grid-cols-2 gap-6">
      {EXPERIENCE.map((item, i) => (
        <div
          key={item.role}
          className={`group bg-[#0f0f0f] border border-white/10 rounded-xl p-6 transition-all duration-500 hover:border-[#a8ff78]/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          {/* meta row */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest text-[#a8ff78]">
              {item.type}
            </span>

            <span className="text-xs text-gray-500">{item.period}</span>
          </div>

          {/* role */}
          <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-[#a8ff78] transition">
            {item.role}
          </h3>

          {/* organization */}
          <p className="text-sm text-gray-400 mb-4">{item.org}</p>

          {/* description */}
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            {item.description}
          </p>

          {/* tags */}
          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 hover:bg-[#a8ff78]/10 hover:border-[#a8ff78]/40 hover:text-white transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* footer */}
    <p className="mt-16 text-sm text-gray-300">
      Final year — more milestones coming soon :)
    </p>
  </div>
</section>


);
}
