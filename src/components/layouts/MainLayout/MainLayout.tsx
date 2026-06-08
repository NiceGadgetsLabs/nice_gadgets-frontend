import { Link, Outlet } from 'react-router';
import { Logo } from '../../ui/Logo/Logo';
import { Footer } from '../../blocks/Footer';

export const MainLayout = () => {
  return (
    <>
      <header>
        <Logo type="header" />
        <nav>
          <ul>
            <li>
              <Link to="/phones">phones</Link>
            </li>

            <li>
              <Link to="/tablets">tablets</Link>
            </li>

            <li>
              <Link to="/accessories">accessories</Link>
            </li>

            <li>
              <Link to="/favorites">favorites</Link>
            </li>

            <li>
              <Link to="/cart">cart</Link>
            </li>
          </ul>
        </nav>
      </header>

      <br />

      <main>
        <p>Current Page:</p>
        <Outlet />
      </main>

      <br />

      <Footer />
    </>
  );
};
