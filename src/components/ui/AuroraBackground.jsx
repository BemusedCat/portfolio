import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">
      {/* Aurora ribbons */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="50%" stopColor="#00f2fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4facfe" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#667eea" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0" />
            <stop offset="50%" stopColor="#39ff14" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="20" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ribbon 1 - Cyan */}
        <motion.path
          d="M-100,200 Q200,100 400,200 T800,150 T1200,250 T1600,200"
          fill="none"
          stroke="url(#aurora1)"
          strokeWidth="150"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-100,200 Q200,100 400,200 T800,150 T1200,250 T1600,200",
              "M-100,250 Q200,150 400,250 T800,200 T1200,150 T1600,250",
              "M-100,200 Q200,100 400,200 T800,150 T1200,250 T1600,200"
            ]
          }}
          transition={{
            pathLength: { duration: 2 },
            opacity: { duration: 1 },
            d: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Ribbon 2 - Magenta */}
        <motion.path
          d="M-100,400 Q300,300 500,400 T900,350 T1300,450 T1700,400"
          fill="none"
          stroke="url(#aurora2)"
          strokeWidth="120"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-100,400 Q300,300 500,400 T900,350 T1300,450 T1700,400",
              "M-100,350 Q300,450 500,350 T900,400 T1300,350 T1700,450",
              "M-100,400 Q300,300 500,400 T900,350 T1300,450 T1700,400"
            ]
          }}
          transition={{
            pathLength: { duration: 2, delay: 0.3 },
            opacity: { duration: 1, delay: 0.3 },
            d: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Ribbon 3 - Green */}
        <motion.path
          d="M-100,600 Q250,500 450,600 T850,550 T1250,650 T1650,600"
          fill="none"
          stroke="url(#aurora3)"
          strokeWidth="100"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-100,600 Q250,500 450,600 T850,550 T1250,650 T1650,600",
              "M-100,550 Q250,650 450,550 T850,600 T1250,550 T1650,650",
              "M-100,600 Q250,500 450,600 T850,550 T1250,650 T1650,600"
            ]
          }}
          transition={{
            pathLength: { duration: 2, delay: 0.6 },
            opacity: { duration: 1, delay: 0.6 },
            d: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </svg>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}
