import { supabase } from "./supabase/client";
import { useEffect, useState } from "react";

export default function Auth() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotate)); }
          50% { transform: translateY(-8px) rotate(var(--rotate)); }
        }
        .floating-pill {
          animation: float 4s ease-in-out infinite;
          transition: transform 0.3s ease-out;
        }
      `}</style>

      <span 
        className="absolute font-serif italic text-2xl px-6 py-2 rounded-full floating-pill"
        style={{ 
          backgroundColor: '#FEF9C3', 
          color: '#1a1a1a',
          top: '180px',
          left: '220px',
          '--rotate': '-8deg',
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) rotate(-8deg)`,
          animationDelay: '0s'
        } as React.CSSProperties}
      >
        Events
      </span>
      
      <span 
        className="absolute font-serif italic text-2xl px-6 py-2 rounded-full floating-pill"
        style={{ 
          backgroundColor: '#DBEAFE', 
          color: '#1a1a1a',
          top: '280px',
          right: '200px',
          '--rotate': '5deg',
          transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * 0.4}px) rotate(5deg)`,
          animationDelay: '1.5s'
        } as React.CSSProperties}
      >
        Journal
      </span>
      
      <span 
        className="absolute font-serif italic text-2xl px-6 py-2 rounded-full floating-pill"
        style={{ 
          backgroundColor: '#FBCFE8', 
          color: '#1a1a1a',
          bottom: '140px',
          right: '320px',
          '--rotate': '-12deg',
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * -0.3}px) rotate(-12deg)`,
          animationDelay: '0.8s'
        } as React.CSSProperties}
      >
        Habits
      </span>

      <div className="flex flex-col items-center z-10" style={{ width: '340px' }}>
        <h1 
          className="font-serif mb-12"
          style={{ 
            fontSize: '4.5rem', 
            fontWeight: 400, 
            color: '#1a1a1a',
            letterSpacing: '-0.02em'
          }}
        >
          Sign up
        </h1>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-4 rounded-2xl text-lg font-medium transition-opacity hover:opacity-90"
          style={{ 
            backgroundColor: '#1a1a1a', 
            color: '#ffffff',
            maxWidth: '340px'
          }}
        >
          Continue with Google
        </button>

          <p 
            className="mt-6 text-lg cursor-pointer hover:underline"
            style={{ color: '#3B82F6' }}
          >
            Already have a Vision-tracker?
          </p>

        <p 
          className="mt-4 text-sm"
          style={{ color: '#9CA3AF' }}
        >
          Terms & Conditions
        </p>
      </div>
    </div>
  );
}
