import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle } from '../ui';

const experiences = [
  {
    company: 'CrowdStrike',
    logo: '🦅',
    color: 'bg-red-500',
    type: 'Full-time',
    threshold: 0.15,
    roles: [
      {
        title: 'Engineer II | CI/CD Devops SDA UI',
        period: 'Feb 2026 - Present',
        duration: '1 mo',
        location: 'Bengaluru, Karnataka, India',
      },
    ],
  },
  {
    company: 'Oracle',
    logo: '◯',
    color: 'bg-red-600',
    type: 'Full-time · 3 yrs 8 mos',
    threshold: 0.45,
    roles: [
      {
        title: 'Site Reliability Engineer 2 | GenAI',
        period: 'Feb 2025 - Feb 2026',
        duration: '1 yr 1 mo',
        location: 'Bengaluru, Karnataka, India',
      },
      {
        title: 'Software Developer 2',
        period: 'Aug 2024 - Feb 2025',
        duration: '7 mos',
        location: 'Gurugram, Haryana, India · On-site',
      },
      {
        title: 'Associate Software Developer',
        period: 'Jul 2022 - Aug 2024',
        duration: '2 yrs 2 mos',
        location: 'Gurugram, Haryana, India · On-site',
      },
    ],
    skills: ['React.js', 'Node.js', '+5 skills'],
  },
  {
    company: 'Paytm',
    logo: '💳',
    color: 'bg-blue-500',
    type: 'Internship',
    threshold: 0.75,
    roles: [
      {
        title: 'Software Engineer',
        period: 'Jan 2022 - Jun 2022',
        duration: '6 mos',
        location: 'Noida, Uttar Pradesh, India',
      },
    ],
    skills: ['React.js', 'JavaScript', '+2 skills'],
  },
];

function ExperienceCard({ exp, scrollYProgress, index, isLast }) {
  const threshold = exp.threshold;

  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.12, threshold],
    [0, 1]
  );

  const x = useTransform(
    scrollYProgress,
    [threshold - 0.12, threshold],
    [-50, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [threshold - 0.12, threshold],
    [0.8, 1]
  );

  // Dot glow animation triggers when card becomes visible
  const glowOpacity = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold, threshold + 0.1],
    [0, 1, 0.3]
  );

  return (
    <motion.div
      className={`relative pl-12 ${!isLast ? 'pb-12' : ''}`}
      style={{ opacity, x, scale }}
    >
      {/* Timeline dot with glow */}
      <motion.div
        className={`absolute left-0 w-8 h-8 rounded-full ${exp.color} flex items-center justify-center text-white text-sm z-10`}
        style={{
          boxShadow: useTransform(
            glowOpacity,
            (v) => `0 0 ${v * 30}px ${v * 15}px rgba(64, 112, 244, ${v * 0.7})`
          ),
        }}
      >
        {exp.logo}
      </motion.div>

      {/* Company header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold dark:text-white">{exp.company}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{exp.type}</p>
      </div>

      {/* Roles */}
      <div className="space-y-4 ml-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
        {exp.roles.map((role, roleIndex) => (
          <motion.div
            key={roleIndex}
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: roleIndex * 0.1 }}
          >
            {/* Role dot */}
            <div className="absolute -left-[21px] top-2 w-2 h-2 rounded-full bg-primary" />

            <h4 className="font-semibold dark:text-white">{role.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {role.period} · {role.duration}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role.location}</p>
          </motion.div>
        ))}

        {/* Skills */}
        {exp.skills && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-2">
            <i className="bx bx-diamond text-primary"></i>
            <span>{exp.skills.join(', ')}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section ref={sectionRef} id="experience" className="section bd-container">
      <SectionTitle>Experience</SectionTitle>

      <div className="max-w-3xl mx-auto relative">
        {/* Animated timeline line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
        <motion.div
          ref={timelineRef}
          className="absolute left-[15px] top-0 w-0.5 bg-gradient-to-b from-primary via-primary to-blue-400 origin-top"
          style={{
            scaleY: scrollYProgress,
            height: '100%',
          }}
        />

        {/* Glowing head of the timeline */}
        <motion.div
          className="absolute left-[12px] w-2 h-2 rounded-full bg-primary"
          style={{
            top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            boxShadow: '0 0 20px 8px rgba(64, 112, 244, 0.6)',
          }}
        />

        {/* Experience cards */}
        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              scrollYProgress={scrollYProgress}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
