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

return ( <section className="relative min-h-[85vh] md:min-h-screen bg-[#000000ae] text-white flex items-center px-6 md:px-12 pt-20 md:pt-0">

 
  {/* subtle radial glow */}
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,255,120,0.02),transparent_60%)]" />

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">

    {/* LEFT CONTENT */}
    <div className="text-center md:text-left">

      <p className="text-sm md:text-lg uppercase tracking-widest text-gray-200 font-bold mb-3">
        This is me
      </p>

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
        Vishwas
        <br />
        <span className="text-white/80">Singh</span>
      </h1>

      <div className="mt-4 text-lg text-[#a8ff78] h-8">
        {typed}
        <span className="animate-pulse text-[#a8ff78]">|</span>
      </div>

      <p className="mt-6 text-gray-400 max-w-md md:max-w-lg leading-relaxed mx-auto md:mx-0">
        I design and build modern web applications, backend systems
        and AI-powered tools focused on performance and real-world impact.
      </p>

      <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">

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

    {/* VIDEO PANEL */}
    <div className="hidden md:flex justify-center md:justify-end">

      <div className="relative w-full max-w-[680px] lg:max-w-[760px]">

        <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)]">

          <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  controls={false}
  onEnded={(e) => {
    const vid = e.currentTarget;
    vid.currentTime = 0;
    vid.play();
  }}
  className="w-[140%] h-[140%] object-cover scale-110 opacity-90 pointer-events-none"
>
  <source src="/ClipOfHacking01.mp4" type="video/mp4" />
</video>

          {/* horizontal oval vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_70%,black_100%)]"></div>

        </div>

      </div>

    </div>

  </div>

</section>
 

);
}


