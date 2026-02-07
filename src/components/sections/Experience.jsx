import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle } from '../ui';

const experiences = [
  {
    company: 'CrowdStrike',
    icon: 'bxs-shield',
    color: 'bg-red-600',
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
    icon: 'bxs-cloud',
    color: 'bg-red-500',
    type: 'Full-time · 3 yrs 8 mos',
    threshold: 0.4,
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
    icon: 'bxs-wallet',
    color: 'bg-sky-500',
    type: 'Internship',
    threshold: 0.8,
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

// Individual role component to properly use hooks
function RoleCard({ role, scrollYProgress, roleThreshold, isLast }) {
  const opacity = useTransform(
    scrollYProgress,
    [roleThreshold - 0.05, roleThreshold],
    [0, 1]
  );

  const x = useTransform(
    scrollYProgress,
    [roleThreshold - 0.05, roleThreshold],
    [-40, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [roleThreshold - 0.05, roleThreshold],
    [0.85, 1]
  );

  const glowShadow = useTransform(
    scrollYProgress,
    [roleThreshold - 0.03, roleThreshold, roleThreshold + 0.08],
    [
      '0 0 0 0 rgba(64, 112, 244, 0)',
      '0 0 20px 8px rgba(64, 112, 244, 0.9)',
      '0 0 6px 2px rgba(64, 112, 244, 0.4)'
    ]
  );

  return (
    <motion.div
      className={`relative ${!isLast ? 'pb-6' : ''}`}
      style={{ opacity, x, scale }}
    >
      {/* Role dot with glow - aligned with timeline at left-[5px] */}
      <motion.div
        className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-primary z-10"
        style={{ boxShadow: glowShadow }}
      />

      <h4 className="font-semibold dark:text-white">{role.title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {role.period} · {role.duration}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{role.location}</p>
    </motion.div>
  );
}

// Nested timeline for roles
function RolesTimeline({ roles, scrollYProgress, baseThreshold, skills }) {
  const hasMultipleRoles = roles.length > 1;

  const timelineScale = useTransform(
    scrollYProgress,
    [baseThreshold, baseThreshold + (roles.length * 0.06)],
    [0, 1]
  );

  const skillsOpacity = useTransform(
    scrollYProgress,
    [baseThreshold + (roles.length * 0.06), baseThreshold + (roles.length * 0.06) + 0.05],
    [0, 1]
  );

  return (
    <div className="relative ml-2 pl-8">

      {roles.map((role, roleIndex) => (
        <RoleCard
          key={roleIndex}
          role={role}
          scrollYProgress={scrollYProgress}
          roleThreshold={baseThreshold + (roleIndex * 0.06)}
          isLast={roleIndex === roles.length - 1}
        />
      ))}

      {/* Skills */}
      {skills && (
        <motion.div
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-4"
          style={{ opacity: skillsOpacity }}
        >
          <i className="bx bx-diamond text-primary"></i>
          <span>{skills.join(', ')}</span>
        </motion.div>
      )}
    </div>
  );
}

function ExperienceCard({ exp, scrollYProgress, isLast }) {
  const threshold = exp.threshold;

  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold - 0.02],
    [0, 1]
  );

  const x = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold - 0.02],
    [-50, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold - 0.02],
    [0.8, 1]
  );

  const dotGlow = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold, threshold + 0.08],
    [
      '0 0 0 0 rgba(64, 112, 244, 0)',
      '0 0 25px 12px rgba(64, 112, 244, 0.8)',
      '0 0 8px 4px rgba(64, 112, 244, 0.4)'
    ]
  );

  return (
    <motion.div
      className={`relative pl-12 ${!isLast ? 'pb-10' : ''}`}
      style={{ opacity, x, scale }}
    >
      {/* Timeline dot with icon */}
      <motion.div
        className={`absolute left-0 w-8 h-8 rounded-full ${exp.color} flex items-center justify-center text-white text-base z-10`}
        style={{ boxShadow: dotGlow }}
      >
        <i className={`bx ${exp.icon}`}></i>
      </motion.div>

      {/* Company header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold dark:text-white">{exp.company}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{exp.type}</p>
      </div>

      {/* Roles with nested timeline */}
      <RolesTimeline
        roles={exp.roles}
        scrollYProgress={scrollYProgress}
        baseThreshold={threshold}
        skills={exp.skills}
      />
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const timelineHeadTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="experience" className="section bd-container">
      <SectionTitle>Experience</SectionTitle>

      <div className="max-w-3xl mx-auto relative">
        {/* Main timeline background */}
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {/* Animated main timeline line */}
        <motion.div
          className="absolute left-[15px] top-0 w-0.5 bg-gradient-to-b from-primary via-primary to-blue-400 origin-top"
          style={{
            scaleY: scrollYProgress,
            height: '100%',
          }}
        />

        {/* Glowing head of the timeline */}
        <motion.div
          className="absolute left-[12px] w-2 h-2 rounded-full bg-primary z-20"
          style={{
            top: timelineHeadTop,
            boxShadow: '0 0 20px 8px rgba(64, 112, 244, 0.7)',
          }}
        />

        {/* Experience cards */}
        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              scrollYProgress={scrollYProgress}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
