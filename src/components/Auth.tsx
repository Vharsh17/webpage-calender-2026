import { supabase } from "../supabase/client";

export function Auth() {
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
      {/* Decorative Pills */}
      <div className="absolute top-32 left-24 bg-yellow-200 text-yellow-900 px-6 py-2 rounded-full text-sm font-medium transform -rotate-6">
        Events
      </div>
      <div className="absolute top-48 right-32 bg-blue-200 text-blue-900 px-6 py-2 rounded-full text-sm font-medium transform rotate-3">
        Journal
      </div>
      <div className="absolute bottom-48 right-40 bg-pink-200 text-pink-900 px-6 py-2 rounded-full text-sm font-medium transform -rotate-3">
        Habits
      </div>

      {/* Main Auth Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <div className="space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-serif text-gray-900">Sign in</h1>
            <p className="text-sm text-gray-600">
              Access your calendar, journal, habits, and events
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Continue with Google
          </button>

          {/* Footer Text */}
          <p className="text-xs text-center text-gray-500">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
