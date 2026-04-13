import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map((l) => l.href.slice(1));

      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);

        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 md:px-10">

        {/* Logo */}
        <a
          href="/"
          className="text-lg md:text-xl font-bold tracking-wide text-white"
        >
          Vishwas<span className="text-[#a8ff78]">_</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 text-sm">

          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} className="relative group">

              <a
                href={href}
                className={`transition-colors duration-200 ${
                  active === href.slice(1)
                    ? "text-[#a8ff78]"
                    : "text-white/60 group-hover:text-white"
                }`}
              >
                {label}
              </a>

              <span
                className={`absolute left-0 -bottom-2 h-[2px] bg-[#a8ff78] transition-all duration-300 ${
                  active === href.slice(1)
                    ? "w-full shadow-[0_0_8px_#a8ff78]"
                    : "w-0 group-hover:w-full"
                }`}
              />

            </li>
          ))}

        </ul>

        {/* Hire Me Button */}
        <a
          href="mailto:thevishwass@gmail.com"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-md text-sm font-semibold text-black bg-[#a8ff78] transition-all duration-300 shadow-[0_4px_18px_rgba(168,255,120,0.35)] hover:bg-green hover:shadow-[0_8px_30px_rgba(168,255,120,0.5)]"
        >
          Hire Me
        </a>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[6px]"
        >
          <span
            className={`h-[2px] w-6 bg-white transition ${
              menuOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition ${
              menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 pb-6 pt-4">

          <ul className="flex flex-col gap-5 text-base">

            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block transition ${
                    active === href.slice(1)
                      ? "text-[#a8ff78]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}

          </ul>

          <a
            href="mailto:thevishwass@gmail.com"
            className="mt-6 block text-center py-3 rounded-md bg-[#a8ff78] text-black font-semibold hover:bg-white transition"
          >
            Hire Me
          </a>

        </div>
      </div>

    </nav>
  );
}
