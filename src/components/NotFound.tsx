"use client"

// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center p-6 text-white">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#e94560]/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0f3460]/30 rounded-full mix-blend-soft-light filter blur-3xl animate-float-reverse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* 404 Text with Glow */}
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#0f3460] relative">
          404
          <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#0f3460] animate-pulse-slow opacity-75">
            404
          </span>
        </h1>

        {/* Message */}
        <p className="text-2xl font-light max-w-2xl leading-relaxed">
          Lost in the cosmic void? Don't worry, we'll beam you back to safety. The page you're looking for has either
          been sucked into a black hole or never existed in this dimension.
        </p>

        {/* Animated Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 font-medium text-white transition-all transform bg-[#e94560] rounded-lg hover:bg-[#0f3460] hover:scale-105 hover:gap-3 group"
        >
          <span>Return to Homebase</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 transition-transform group-hover:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </div>

      {/* Floating Stars */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, -20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes float-reverse {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes pulse-slow {
          0% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.25;
          }
          100% {
            opacity: 0.75;
          }
        }

        @keyframes star {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 15s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-star {
          animation: star 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
