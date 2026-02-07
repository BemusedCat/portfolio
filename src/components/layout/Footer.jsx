import { SocialLinks } from '../ui';

const socialLinks = [
  { icon: 'bxl-linkedin', url: 'https://www.linkedin.com/in/abhigyann/', label: 'LinkedIn' },
  { icon: 'bxl-instagram', url: 'https://www.instagram.com/abhigyann22', label: 'Instagram' },
  { icon: 'bxl-github', url: 'https://github.com/BemusedCat', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary dark:bg-gray-800 text-white text-center font-semibold py-8">
      <h2 className="text-3xl mb-8">Abhigyan</h2>
      <SocialLinks
        links={socialLinks}
        size="sm"
        direction="horizontal"
        className="justify-center mb-8"
      />
      <p className="text-sm opacity-70">
        &copy; {new Date().getFullYear()} Abhigyan. All rights reserved.
      </p>
    </footer>
  );
}
