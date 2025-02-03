import { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <Particles
      className="particles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: isDarkMode ? "#888888" : "#666666",
          },
          links: {
            color: isDarkMode ? "#888888" : "#666666",
            distance: 150,
            enable: true,
            opacity: isDarkMode ? 0.3 : 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: isDarkMode ? 0.4 : 0.3,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
} 