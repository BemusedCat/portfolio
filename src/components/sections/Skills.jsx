import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle, SkillBar, NeonTitle } from '../ui';
import ProgrammerIllustration from '../svg/ProgrammerIllustration';
import useIsMobile from '../../hooks/useIsMobile';
import useViewMode from '../../hooks/useViewMode';

const skills = [
  { name: 'Java & C++', icon: 'bx-code-curly', percentage: 85 },
  { name: 'TypeScript & Modern UI', icon: 'bxl-typescript', percentage: 80 },
  { name: 'Docker & CI/CD Pipelines', icon: 'bxl-docker', percentage: 75 },
  { name: 'OpenTelemetry & Observability', icon: 'bx-pulse', percentage: 70 },
  { name: 'AI/ML & LLM Integration', icon: 'bx-bot', percentage: 60 },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const { isModernView } = useViewMode();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? -15 : -30]
  );

  return (
    <section ref={sectionRef} id="skills" className="section bd-container">
      {isModernView ? (
        <NeonTitle>Skills</NeonTitle>
      ) : (
        <SectionTitle>Skills</SectionTitle>
      )}

      {isModernView ? (
        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              percentage={skill.percentage}
            />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
              Professional Skills
            </h3>
            <p className="mb-8 text-center md:text-left">
              Technologies and tools I work with regularly.
            </p>

            {skills.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                percentage={skill.percentage}
              />
            ))}
          </motion.div>

          <motion.div
            className="hidden md:flex justify-center items-center pt-[15%] will-change-transform"
            style={{ y: parallaxY }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ProgrammerIllustration className="w-full" />
          </motion.div>
        </div>
      )}
    </section>
  );
}
