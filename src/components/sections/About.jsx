import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';
import aboutImg from '../../assets/img/about.jpg';

export default function About() {
  return (
    <section id="about" className="section bd-container">
      <SectionTitle>About Me</SectionTitle>

      <div className="grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
        <motion.div
          className="justify-self-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={aboutImg}
            alt="About Abhigyan"
            className="w-48 md:w-72 rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            I'm Abhigyan
          </h3>
          <p className="leading-relaxed dark:text-gray-300">
            I am a Software Engineer II at CrowdStrike, specializing in CI/CD pipelines
            and UI infrastructure. Previously at Oracle, I am currently pursuing my
            Master's in Computer Science from Georgia Tech. I bridge the gap between
            scalable DevOps systems and seamless user experiences, with a focus on
            observability and AI integration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
