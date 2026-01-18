import { supabase } from "./supabase/client";

const HEADER_COLORS = [
  "#6B9B7F",
  "#E77FA8",
  "#9B8BC9",
  "#F5A962",
  "#7FB3D5",
  "#E8A5A5",
];

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4">
      
      {/* HEADER */}
<div className="w-full text-center mt-20 mb-24">
  <h1
    className="font-serif tracking-tight"
    style={{
      fontSize: "4.5rem",
      color: "#6B9B7F",
      marginBottom: "0.5rem",
    }}
  >
    Calendar
  </h1>

  <p
    className="font-serif tracking-tight"
    style={{
      fontSize: "6.5rem",
      color: "#7FB3D5",
      lineHeight: "1",
    }}
  >
    2026
  </p>
</div>

      {/* Auth Card */}
     <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg px-12 py-14 text-center">
        
        {/* Main message */}
        <h2 className="text-2xl font-medium text-gray-800 leading-relaxed mb-10">
  Access your calendar, journal, habits, and events
</h2>

<p className="text-gray-500 text-lg mb-12">
  Sign in
</p>

        {/* Google button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full max-w-sm mx-auto rounded-xl bg-gray-900 py-3 text-white text-base font-medium"

        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-14 text-sm text-gray-400 leading-relaxed">

          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}






// export function Auth() {
//   const handleGoogleSignIn = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: "http://localhost:3000",
//       },
//     });
//   };
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Decorative Pills */}
//       <div className="absolute top-32 left-24 bg-yellow-200 text-yellow-900 px-6 py-2 rounded-full text-sm font-medium transform -rotate-6">
//         Events
//       </div>
//       <div className="absolute top-48 right-32 bg-blue-200 text-blue-900 px-6 py-2 rounded-full text-sm font-medium transform rotate-3">
//         Journal
//       </div>
//       <div className="absolute bottom-48 right-40 bg-pink-200 text-pink-900 px-6 py-2 rounded-full text-sm font-medium transform -rotate-3">
//         Habits
//       </div>

//       {/* Main Auth Card */}
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10">
//         <div className="space-y-6">
//           {/* Title */}
//           <div className="text-center space-y-2">
//             <h1 className="text-4xl font-serif text-gray-900">Sign in</h1>
//             <p className="text-sm text-gray-600">
//               Access your calendar, journal, habits, and events
//             </p>
//           </div>

//           {/* Google Sign In Button */}
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
//           >
//             Continue with Google
//           </button>

//           {/* Footer Text */}
//           <p className="text-xs text-center text-gray-500">
//             By continuing, you agree to our Terms & Privacy Policy
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
