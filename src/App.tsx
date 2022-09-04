import { useEffect, useState } from 'react';
import Collection from './components/Collection/Collection';

type TItem = {
  name: string;
  photos: string[];
};

const App: React.FC = () => {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const API_LINK = `https://6308f3a2f8a20183f76c214f.mockapi.io/collections`;

    fetch(API_LINK)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получении данных');
      });
  }, []);

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <header className="top">
        <ul className="tags">
          <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li>
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
