// import clsx from 'clsx';
import './Footer.scss';
import { Logo } from '../../ui/Logo/Logo';

export const Footer = () => {
  return (
    <footer className="footer">
      <Logo type="footer" />
      <ul>
        <li>GitHub</li>
        <li>Contacts</li>
        <li>Rights</li>
      </ul>
    </footer>
  );
};
