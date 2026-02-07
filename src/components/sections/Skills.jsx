import { motion } from 'framer-motion';
import { SectionTitle, SkillBar } from '../ui';
import ProgrammerIllustration from '../svg/ProgrammerIllustration';

const skills = [
  { name: 'HTML5', icon: 'bxl-html5', percentage: 95 },
  { name: 'CSS3', icon: 'bxl-css3', percentage: 85 },
  { name: 'JavaScript', icon: 'bxl-javascript', percentage: 65 },
  { name: 'Java', icon: 'bx-code-block', percentage: 65 },
  { name: 'C/C++', icon: 'bx-code-alt', percentage: 70 },
  { name: 'Machine Learning', icon: 'bx-line-chart', percentage: 50 },
];

export default function Skills() {
  return (
    <section id="skills" className="section bd-container">
      <SectionTitle>Skills</SectionTitle>

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
          className="hidden md:flex justify-center items-center pt-[15%]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProgrammerIllustration className="w-full" />
        </motion.div>
      </div>
    </section>
  );
}
