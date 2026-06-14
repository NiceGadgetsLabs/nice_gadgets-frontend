import { Link, useLocation, useParams } from 'react-router';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { productId } = useParams();

  const category = location.pathname.split('/')[1];

  return (
    <nav className="breadcrumbs">
      <Link className="breadcrumbs-link" to="/">
        Home
      </Link>

      <span className="breadcrumbs-separator">{' > '}</span>
      <Link className="breadcrumbs-link" to={`/${category}`}>
        {category}
      </Link>

      <span className="breadcrumbs-separator">{' > '}</span>
      <span className="breadcrumbs-current">{productId}</span>
    </nav>
  );
};
