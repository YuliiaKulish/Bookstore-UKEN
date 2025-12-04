import { Link } from 'react-router-dom';
import './Categories.scss';
import paperGif from '../../books/img/gif/paper.gif';
import audioGif from '../../books/img/gif/audio.gif';
import kindleGif from '../../books/img/gif/kindlebook.gif';

export const Categories = () => {
  const items = [
    {
      title: 'Paper books',
      text: '107 items',
      img: paperGif,
      link: '/paper',
    },
    {
      title: 'Audiobooks',
      text: '35 items',
      img: audioGif,
      link: '/audiobook',
    },
    {
      title: 'Kindle books',
      text: '50 items',
      img: kindleGif,
      link: '/kindle',
    },
  ];

  return (
    <div className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__grid">
        {items.map(item => (
          <div className="category" key={item.title}>
            <Link to={item.link}>
              <div className="category__media">
                <img
                  className="category__media-img"
                  src={item.img}
                  alt={item.title}
                />
              </div>

              <div className="category__content">
                <h3 className="category__content-title">{item.title}</h3>
                <p className="category__content-text">{item.text}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
