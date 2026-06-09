// import clsx from 'clsx';
import './Footer.scss';
import { Logo } from '../../ui/Logo/Logo';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Logo type="footer" />
      </div>
      <ul className="footer__list">
        <li className="footer__item">
          <a
            href="https://github.com/NiceGadgetsLabs/nice_gadgets-frontend"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
        <li className="footer__item">
          <a
            href="https://github.com/NiceGadgetsLabs/nice_gadgets-frontend"
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>
        </li>
        <li className="footer__item">
          <a
            href="https://github.com/NiceGadgetsLabs/nice_gadgets-frontend"
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </li>
      </ul>
      <button onClick={scrollToTop} className="footer__top-button">
        Back to top (temp)
      </button>
    </footer>
  );
};
