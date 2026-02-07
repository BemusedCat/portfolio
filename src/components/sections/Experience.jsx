import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';

const experiences = [
  {
    company: 'CrowdStrike',
    logo: '🦅',
    color: 'bg-red-500',
    type: 'Full-time',
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

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

export default function Experience() {
  return (
    <section id="experience" className="section bd-container">
      <SectionTitle>Experience</SectionTitle>

      <motion.div
        className="max-w-3xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            variants={item}
            className={`relative pl-8 ${index !== experiences.length - 1 ? 'pb-8' : ''}`}
          >
            {/* Timeline line */}
            {index !== experiences.length - 1 && (
              <div className="absolute left-[11px] top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
            )}

            {/* Company header */}
            <div className="flex items-start gap-4 mb-4">
              {/* Timeline dot */}
              <div className={`absolute left-0 w-6 h-6 rounded-full ${exp.color} flex items-center justify-center text-white text-xs`}>
                {exp.logo}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold dark:text-white">{exp.company}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{exp.type}</p>
              </div>
            </div>

            {/* Roles */}
            <div className="space-y-4 ml-4">
              {exp.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="relative">
                  {/* Role dot for multiple roles */}
                  {exp.roles.length > 1 && (
                    <div className="absolute -left-6 top-2 w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  )}

                  <h4 className="font-medium dark:text-white">{role.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {role.period} · {role.duration}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{role.location}</p>
                </div>
              ))}

              {/* Skills */}
              {exp.skills && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <i className="bx bx-diamond text-primary"></i>
                  <span>{exp.skills.join(', ')}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
