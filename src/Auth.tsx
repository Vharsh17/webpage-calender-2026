import { supabase } from "./supabase/client";

export default function Auth() {
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
      <span 
        className="absolute font-serif italic text-2xl px-6 py-2 rounded-full"
        style={{ 
          backgroundColor: '#FEF9C3', 
          color: '#1a1a1a',
          top: '200px',
          left: '180px',
          transform: 'rotate(-8deg)'
        }}
      >
        Events
      </span>
      
      <span 
        className="absolute font-serif italic text-2xl px-6 py-2 rounded-full"
        style={{ 
          backgroundColor: '#DBEAFE', 
          color: '#1a1a1a',
          top: '260px',
          right: '180px',
          transform: 'rotate(5deg)'
        }}
      >
        Journal
      </span>
      
      <span 
        className="absolute font-serif italic text-2xl px-6 py-2 rounded-full"
        style={{ 
          backgroundColor: '#FBCFE8', 
          color: '#1a1a1a',
          bottom: '220px',
          left: '50%',
          marginLeft: '40px',
          transform: 'rotate(-12deg)'
        }}
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
          className="mt-6 text-lg cursor-pointer hover:underline font-serif"
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
