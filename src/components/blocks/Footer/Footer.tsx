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
      <ul className="footer__list">
        <li className="footer__item">GitHub</li>
        <li className="footer__item">Contacts</li>
        <li className="footer__item">Rights</li>
      </ul>
      <button onClick={scrollToTop} className="footer__top-button">
        Back to top (temp)
      </button>
    </footer>
  );
};
