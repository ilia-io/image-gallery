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

  useEffect(() => {
    const category = categoryID ? `category=${categoryID}` : '';
    const API_LINK = `https://6308f3a2f8a20183f76c214f.mockapi.io/collections?${category}`;

    fetch(API_LINK)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получении данных');
      });
  }, [categoryID]);

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onClickCategory = (index: number) => {
    setCategoryID(index);
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
        {collections
          .filter((item: TItem) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item: TItem, index: number) => (
            <Collection key={index} name={item.name} images={item.photos} />
          ))}
      </main>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
};

export default App;
