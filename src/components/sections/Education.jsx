import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle } from '../ui';

const education = [
  {
    institution: 'Georgia Institute of Technology',
    icon: 'bxs-graduation',
    color: 'bg-yellow-600',
    degree: 'Master of Science - MS, Computer Science',
    period: 'Aug 2025 - Jul 2027',
    current: true,
  },
  {
    institution: 'National Institute of Technology Agartala',
    icon: 'bxs-school',
    color: 'bg-blue-700',
    degree: 'Bachelor of Technology - BTech, Electronics and Instrumentation Engineering',
    period: '2018 - 2022',
    current: false,
  },
];

function EducationCard({ edu, index, scrollYProgress }) {
  // Stagger cards but keep both visible - use smaller spacing
  const baseDelay = 0.1 + (index * 0.25);

  // Card flips in from below with rotation
  const y = useTransform(
    scrollYProgress,
    [baseDelay - 0.1, baseDelay + 0.15],
    [80, 0]
  );

  // Keep card visible after animation (don't fade out)
  const opacity = useTransform(
    scrollYProgress,
    [baseDelay - 0.1, baseDelay + 0.05],
    [0, 1]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [baseDelay - 0.1, baseDelay + 0.15],
    [30, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [baseDelay - 0.05, baseDelay + 0.1, baseDelay + 0.2],
    [0.9, 1.03, 1]
  );

  // Glow effect on the icon
  const glowIntensity = useTransform(
    scrollYProgress,
    [baseDelay, baseDelay + 0.15, baseDelay + 0.3],
    [0, 1, 0.3]
  );

  return (
    <motion.div
      className="relative"
      style={{
        y,
        opacity,
        rotateX,
        scale,
        transformPerspective: 1000,
        transformOrigin: 'bottom center',
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
        <div className="flex items-start gap-4">
          {/* Institution icon */}
          <motion.div
            className={`w-14 h-14 rounded-xl ${edu.color} flex items-center justify-center text-3xl text-white shrink-0`}
            style={{
              boxShadow: useTransform(
                glowIntensity,
                (v) => `0 0 ${v * 25}px ${v * 10}px rgba(64, 112, 244, ${v * 0.5})`
              ),
            }}
          >
            <i className={`bx ${edu.icon}`}></i>
          </motion.div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold dark:text-white">
                {edu.institution}
              </h3>
              {edu.current && (
                <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full shrink-0">
                  Current
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {edu.degree}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
              <i className="bx bx-calendar"></i>
              {edu.period}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  // Floating graduation cap animation
  const capY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -30, -20, 0]);
  const capRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -15, 10, 0]);
  const capScale = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [1, 1.2, 1.1, 1]);

  return (
    <section ref={sectionRef} id="education" className="section bd-container">
      <div className="relative">
        {/* Floating graduation cap decoration */}
        <motion.div
          className="absolute -top-8 right-4 md:right-20 text-5xl opacity-20 dark:opacity-10"
          style={{
            y: capY,
            rotate: capRotate,
            scale: capScale,
          }}
        >
          🎓
        </motion.div>

        <SectionTitle>Education</SectionTitle>

        <div className="max-w-2xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <EducationCard
              key={edu.institution}
              edu={edu}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
