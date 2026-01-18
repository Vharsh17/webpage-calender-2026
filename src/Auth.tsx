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
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute top-[180px] left-[120px] px-8 py-3 rounded-full text-2xl font-serif transform -rotate-6"
        style={{ backgroundColor: '#FEF9C3', color: '#1a1a1a' }}
      >
        Events
      </div>
      
      <div 
        className="absolute top-[220px] right-[140px] px-8 py-3 rounded-full text-2xl font-serif transform rotate-3"
        style={{ backgroundColor: '#DBEAFE', color: '#1a1a1a' }}
      >
        Journal
      </div>
      
      <div 
        className="absolute bottom-[200px] left-1/2 transform translate-x-16 -rotate-6 px-8 py-3 rounded-full text-2xl font-serif"
        style={{ backgroundColor: '#FBCFE8', color: '#1a1a1a' }}
      >
        Habits
      </div>

      <div className="w-full max-w-md text-center z-10">
        <h1 
          className="font-serif mb-16"
          style={{ fontSize: '5rem', fontWeight: 400, color: '#1a1a1a' }}
        >
          Sign up
        </h1>

        <div className="space-y-10 px-8">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-5 px-8 rounded-2xl text-xl font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
          >
            Continue with Google
          </button>

          <p 
            className="text-lg cursor-pointer hover:underline"
            style={{ color: '#3B82F6' }}
          >
            Already have a Vision-tracker?
          </p>

          <p 
            className="text-sm"
            style={{ color: '#9CA3AF' }}
          >
            Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
}
