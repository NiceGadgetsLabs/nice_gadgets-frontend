import { Outlet } from 'react-router-dom';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Container } from '../../components/atoms/Container/Container';
import './MainLayout.scss';

export const MainLayout = () => {
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
