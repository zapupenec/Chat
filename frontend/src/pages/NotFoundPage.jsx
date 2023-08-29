import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import notFoundImage from '../assets/notFound.svg';

export const NotFoundPage = () => (
  <div className="text-center h-75">
    <Image className="h-50" src={notFoundImage} fluid alt="Страница не найдена" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      <span>Но вы можете перейти </span>
      <Link to="/">на главную страницу</Link>
    </p>
  </div>
);
