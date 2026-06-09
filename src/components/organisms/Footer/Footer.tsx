import type { FC } from 'react';
import { Link } from 'react-router';
import { Container } from '../../atoms/Container/Container';
import { Logo } from '../../atoms/Logo/Logo';
import { Icon } from '../../atoms/Icon/Icon';
import './Footer.scss';

const LINKS = [
  {
    name: 'GitHub',
    link: 'https://github.com/NiceGadgetsLabs/nice_gadgets-frontend',
  },
  {
    name: 'Contacts',
    link: 'https://github.com/NiceGadgetsLabs/nice_gadgets-frontend',
  },
  {
    name: 'Rights',
    link: 'https://github.com/NiceGadgetsLabs/nice_gadgets-frontend',
  },
];

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <Logo type="footer" />

          <nav className="footer__nav">
            <ul className="footer__list">
              {LINKS.map((link) => (
                <li key={link.name} className="footer__item">
                  <Link className="footer__link" to={link.link} target="_blank">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="footer__top-button"
            onClick={scrollToTop}
            type="button"
            aria-label="Scroll to top of the page"
          >
            Back to top
            <span className="footer__top-button-icon">
              <Icon width={32} height={32} type="arrow-up" />
            </span>
          </button>
        </div>
      </Container>
    </footer>
  );
};
