import { useEffect, useState } from 'react';
import Collection from './components/Collection/Collection';

type TItem = {
  name: string;
  photos: string[];
};

const categories = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

const App: React.FC = () => {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [categoryID, setCategoryID] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryID ? `category=${categoryID}` : '';
    const API_LINK = `https://6308f3a2f8a20183f76c214f.mockapi.io/collections?page=${page}&limit=3&${category}`;

    fetch(API_LINK)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получении данных');
      })
      .finally(() => setIsLoading(false));
  }, [categoryID, page]);

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onClickCategory = (index: number) => {
    setCategoryID(index);
    setPage(1);
  };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <header className="top">
        <ul className="tags">
          {categories.map((item, index) => (
            <li
              key={index}
              className={categoryID === index ? 'active' : ''}
              onClick={() => onClickCategory(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={onChangeSearchValue}
        />
      </header>
      <main className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((item: TItem) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item: TItem, index: number) => (
              <Collection key={index} name={item.name} images={item.photos} />
            ))
        )}
      </main>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            className={page === index + 1 ? 'active' : ''}
            onClick={() => setPage(index + 1)}
            key={index}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
