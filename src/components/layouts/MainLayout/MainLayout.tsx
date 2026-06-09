import { Outlet } from 'react-router';
import { Header } from '../../organisms/Header/Header';
import { BurgerMenu } from '../../organisms/BurgerMenu/BurgerMenu';
import { Logo } from '../../ui/Logo/Logo';
import { useState } from 'react';

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <BurgerMenu setIsMenuOpen={setIsMenuOpen} />}
      <main>
        <Outlet />
      </main>

      <footer>
        <Logo type="footer" />
        <ul>
          <li>GitHub</li>
          <li>Contacts</li>
          <li>Rights</li>
        </ul>
      </footer>
    </>
  );
};
