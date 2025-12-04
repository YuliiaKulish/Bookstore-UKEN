import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img
        src={`${import.meta.env.BASE_URL}books/img/page-not-found.webp`}
        alt="404"
        className="not-found__image"
      />

      <h1>Page not found</h1>
      <p>The page you are looking for doesn’t exist.</p>

      <Link to="/" className="not-found__button">
        Go Home
      </Link>
    </div>
  );
};
