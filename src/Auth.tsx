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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-32 left-24 bg-yellow-100 text-yellow-800 px-6 py-2 rounded-full text-lg font-serif transform -rotate-6">
        Events
      </div>
      <div className="absolute top-48 right-32 bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-lg font-serif transform rotate-3">
        Journal
      </div>
      <div className="absolute bottom-40 right-1/3 bg-pink-100 text-pink-800 px-6 py-2 rounded-full text-lg font-serif transform -rotate-6">
        Habits
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 relative z-10">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-serif text-gray-900 mb-4">Sign in</h1>
            <p className="text-gray-600">
              Access your calendar, journal, habits, and events
            </p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 w-full bg-gray-900 text-white py-4 px-4 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-xs text-center text-gray-400">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
