import { ProductCard } from '../../components/ProductCard';
import { useStore } from '../../hooks/useStore';
import './Favourites.scss';

export const Favourites = () => {
  const { favourites } = useStore();

  return (
    <section className="section">
      <div className="container">
        <h2 className="favourites__title">Favourites</h2>
        <p className="favourites__subtitle">{favourites.length} items</p>
        <ul className="favourites__list">
          {favourites.map(book => (
            <li className="favourites__item" key={book.id}>
              <ProductCard book={book} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
