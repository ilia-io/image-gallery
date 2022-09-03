import collectionsJson from './assets/collections.json';

const App: React.FC = () => {
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
        <input className="search-input" placeholder="Поиск по названию" />
      </header>
      <main className="content">Изображения</main>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
};

export default App;
