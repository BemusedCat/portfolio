import { SocialLinks } from '../ui';

const socialLinks = [
  { icon: 'bxl-facebook', url: '#', label: 'Facebook' },
  { icon: 'bxl-instagram', url: 'https://www.instagram.com/abhimaigyandega/', label: 'Instagram' },
  { icon: 'bxl-twitter', url: '#', label: 'Twitter' },
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
