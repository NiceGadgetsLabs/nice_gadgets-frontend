import { Outlet } from 'react-router';
import { Header } from '../../components/organisms/Header/Header';
import { BurgerMenu } from '../../components/organisms/BurgerMenu/BurgerMenu';
import { useState } from 'react';
import { Footer } from '../../components/organisms/Footer';

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <BurgerMenu setIsMenuOpen={setIsMenuOpen} />}
      <main>
        <Outlet />
      </main>

      <br />

      <Footer />
    </>
  );
};
