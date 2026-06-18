import type { FC } from 'react';
import { Container } from '../../atoms/Container/Container';
import { Logo } from '../../atoms/Logo/Logo';
import { Icon } from '../../atoms/Icon/Icon';
import { scrollToTop } from '../../../utils/scrollToTop';
import './Footer.scss';

const LINKS = [
  {
    name: 'GitHub',
    link: 'https://github.com/NiceGadgetsLabs/nice_gadgets-frontend',
  },
  {
    name: 'Contacts',
    link: 'https://github.com/NiceGadgetsLabs',
  },
  {
    name: 'Rights',
    link: 'https://github.com/NiceGadgetsLabs/nice_gadgets-frontend/blob/main/LICENSE',
  },
];

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <Logo type="footer" />

          <nav className="footer__nav">
            <ul className="footer__list">
              {LINKS.map((link) => (
                <li key={link.name} className="footer__item">
                  <a
                    className="footer__link"
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
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
            <span className="footer__top-button-frame">
              <Icon className="footer__top-button-icon" width={16} height={16} type="arrow-up" />
            </span>
          </button>
        </div>
      </Container>
    </footer>
  );
};
