// import clsx from 'clsx';
import './Footer.scss';
import { Logo } from '../../ui/Logo/Logo';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="footer">
      <Logo type="footer" />
      <ul>
        <li>GitHub</li>
        <li>Contacts</li>
        <li>Rights</li>
      </ul>
      <button onClick={scrollToTop} className="footer__top-button">
        Back to top (temp)
      </button>
    </footer>
  );
};
