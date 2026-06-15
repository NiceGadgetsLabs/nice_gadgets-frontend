import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollToTop';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Container } from '../../components/atoms/Container/Container';
import './MainLayout.scss';

export const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location.pathname, location.search]);

  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};
