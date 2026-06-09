import { Outlet } from 'react-router';
import { Header } from '../../components/organisms/Header/Header';
import { BurgerMenu } from '../../components/organisms/BurgerMenu/BurgerMenu';
import { useState } from 'react';
import { Footer } from '../../components/organisms/Footer';

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
    >
      {/* Test style for footer delete after adding product */}

      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <BurgerMenu setIsMenuOpen={setIsMenuOpen} />}

      {/* Test style for footer delete after adding product */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
