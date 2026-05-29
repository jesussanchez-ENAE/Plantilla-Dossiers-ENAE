import { useState, useEffect } from "react";
import Portada from "../imports/Portada/Portada";
import Rankings from "../imports/Rankings/Rankings";
import ExperienciaEnae from "../imports/ExperienciaEnae-1/ExperienciaEnae-1-3789";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get("page");
  
  useEffect(() => {
    const handleResize = () => {
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      document.documentElement.style.setProperty('--scale-factor', scale.toString());
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (pageParam === "Rankings") {
    return (
      <div className="size-full bg-black flex items-center justify-center overflow-hidden">
        <div className="relative w-[1920px] h-[1080px] overflow-hidden origin-center" style={{ transform: 'scale(var(--scale-factor, 1))' }}>
          <Rankings />
        </div>
      </div>
    );
  } else if (pageParam === "ExperienciaEnae") {
    return (
      <div className="size-full bg-black flex items-center justify-center overflow-hidden">
        <div className="relative w-[1920px] h-[1080px] overflow-hidden origin-center" style={{ transform: 'scale(var(--scale-factor, 1))' }}>
          <ExperienciaEnae />
        </div>
      </div>
    );
  }

  // Fallback for full app (slider)
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [
    { component: Portada, name: "Portada" },
    { component: Rankings, name: "Rankings" },
    { component: ExperienciaEnae, name: "Experiencia ENAE" }
  ];
  const CurrentScreenComponent = screens[currentScreen].component;

  const goToNext = () => setCurrentScreen((prev) => (prev + 1) % screens.length);
  const goToPrevious = () => setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length);

  return (
    <div className="size-full bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-[1920px] h-[1080px] overflow-hidden origin-center" style={{ transform: 'scale(var(--scale-factor, 1))' }}>
        <CurrentScreenComponent />
      </div>
      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button onClick={goToPrevious} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all"><ChevronLeft className="size-6" /></button>
        <div className="flex gap-2">
          {screens.map((_, index) => (
            <button key={index} onClick={() => setCurrentScreen(index)} className={`transition-all rounded-full ${index === currentScreen ? "bg-white w-8 h-3" : "bg-white/40 hover:bg-white/60 size-3"}`} />
          ))}
        </div>
        <button onClick={goToNext} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all"><ChevronRight className="size-6" /></button>
      </div>
    </div>
  );
}
