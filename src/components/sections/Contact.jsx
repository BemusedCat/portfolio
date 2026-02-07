import { motion } from 'framer-motion';
import { SectionTitle, Input, Button } from '../ui';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="section bd-container">
      <SectionTitle>Contact</SectionTitle>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md"
        >
          <Input label="Name" name="name" />
          <Input label="Email" name="email" type="email" />
          <Input label="Message" name="message" as="textarea" />

          <div className="flex justify-end">
            <Button type="submit">
              Send Message
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
