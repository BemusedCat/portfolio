import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, SocialLinks, Typewriter } from '../ui';
import HeroIllustration from '../svg/HeroIllustration';
import useIsMobile from '../../hooks/useIsMobile';

const socialLinks = [
  { icon: 'bxl-linkedin', url: 'https://www.linkedin.com/in/abhigyan-pandey-b6948811a/', label: 'LinkedIn' },
  { icon: 'bxl-instagram', url: 'https://www.instagram.com/abhimaigyandega/', label: 'Instagram' },
  { icon: 'bxl-github', url: 'https://github.com/BemusedCat', label: 'GitHub' },
];

export default function Home() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? -20 : -50]
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-[calc(100vh-3rem)] md:min-h-screen grid md:grid-cols-2 gap-4 items-center pt-12 md:pt-0 bd-container"
    >
      <div className="order-2 md:order-1">
        <motion.h1
          className="text-3xl md:text-6xl font-bold mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi,<br />
          I'm <span className="text-primary">Abhigyan</span><br />
          <Typewriter
            words={['Freelancer', 'Software Engineer', 'Web Developer']}
            period={2000}
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Button href="#contact">Contact</Button>
        </motion.div>

        <div className="mt-8 md:mt-0 md:pt-8">
          <SocialLinks
            links={socialLinks}
            size="lg"
            direction="horizontal"
            className="md:flex-row"
          />
        </div>
      </div>

      <motion.div
        className="order-1 md:order-2 flex justify-center items-center will-change-transform"
        style={{ y: parallaxY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <HeroIllustration className="w-full max-w-md md:max-w-lg" />
      </motion.div>
    </section>
  );
}
