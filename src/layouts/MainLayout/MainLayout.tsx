import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { BurgerMenu } from '../../components/organisms/BurgerMenu/BurgerMenu';
import { Footer } from '../../components/organisms/Footer';
import './MainLayout.scss';

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="layout">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <BurgerMenu setIsMenuOpen={setIsMenuOpen} />}
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
