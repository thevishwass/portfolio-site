import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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

const EMAIL = "thevishwass@gmail.com";

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@thevishwass",
    desc: "Source code & projects",
    href: "https://github.com/thevishwass",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    handle: "vishwassingh15",
    desc: "Professional profile",
    href: "https://linkedin.com/in/vishwassingh15",
    icon: FaLinkedin,
  },
];

export default function Contact() {
  const { ref, inView } = useInView();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative bg-[#000000] text-white py-28 px-6 md:px-12 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,255,120,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          Contact
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          Let's build
          <br />
          <span className="text-[#a8ff78]">something.</span>
        </h2>

        <p className="text-gray-400 max-w-xl mb-14">
          Open to internships, full-time roles, and collaborations.
          If you have an opportunity or project idea, feel free to reach out.
        </p>

        {/* Email Card */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-8 mb-6 hover:border-[#a8ff78]/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition">

          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Primary
          </p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Email + copy (mobile optimized) */}
            <div className="flex items-center gap-3 flex-wrap">

              <h3 className="text-lg md:text-3xl font-semibold text-white break-all">
                {EMAIL}
              </h3>

              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-widest border rounded-md transition ${
                  copied
                    ? "border-[#a8ff78] text-[#a8ff78]"
                    : "border-white/20 text-gray-300 hover:border-[#a8ff78]"
                }`}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>

            </div>

            {/* Send Mail */}
            <a
              href={`mailto:${EMAIL}`}
              className="px-5 py-2 text-xs uppercase tracking-widest rounded-md bg-[#a8ff78] text-black font-semibold hover:bg-white transition"
            >
              Send Mail →
            </a>

          </div>

        </div>

        {/* Social cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {SOCIALS.map((s) => {
            const Icon = s.icon;

            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group bg-[#0f0f0f] border border-white/10 rounded-xl p-6 hover:border-[#a8ff78]/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition"
              >
                <div className="flex justify-between items-center mb-3">

                  <div className="flex items-center gap-3">

                    <Icon className="text-xl text-white/70 group-hover:text-[#a8ff78] transition" />

                    <span className="text-xs uppercase tracking-widest text-gray-500">
                      {s.label}
                    </span>

                  </div>

                  <span className="text-gray-600 group-hover:text-[#a8ff78] transition">
                    ↗
                  </span>

                </div>

                <p className="text-lg font-semibold text-white mb-1">
                  {s.handle}
                </p>

                <p className="text-sm text-gray-400">
                  {s.desc}
                </p>

              </a>
            );
          })}

        </div>

      </div>
    </section>
  );
}