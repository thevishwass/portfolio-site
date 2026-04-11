const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/[0.06] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">

        {/* Left */}
        <div className="flex flex-col gap-6">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-left w-fit"
          >
            <span className="text-lg font-bold tracking-wider text-white hover:text-[#a8ff78] transition">
              Vishwas<span className="text-[#a8ff78]">_</span>
            </span>
          </button>

          <ul className="flex flex-wrap gap-5 text-sm text-gray-400">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="capitalize hover:text-[#a8ff78] transition"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

        </div>

        {/* Right */}
        <div className="flex flex-col items-start md:items-end gap-4">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2 text-xs uppercase tracking-widest border border-white/15 rounded-md hover:border-[#a8ff78] hover:text-[#a8ff78] transition"
          >
            Back to top ↑
          </button>

          <p className="text-sm text-gray-500">
            © {year} Vishwas Singh — Built with React & Vite
          </p>

        </div>

      </div>
    </footer>
  );
}