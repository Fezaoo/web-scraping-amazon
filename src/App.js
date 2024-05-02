import './App.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

function App() {
  const [Search, setSearch] = useState('')
  const [ActualSearch, setActualSearch] = useState('')
  const [Display, setDisplay] = useState(false)

  function search_products () {
    console.log(Search)
    setDisplay(!Display)
    setActualSearch(Search)
  }
  return (
    <div className="App">
      <div className='header_container'>
        <header className='header'>
          <h1>
            Amazon Products
          </h1>
        </header>
      </div>
      <main className='main_content_container'>
        <section className='content'>
          <div>
          <p className='description'>
            Procure aqui os seus produtos na amazon
          </p>
          <div className='search_container'>
            <button onClick={(e) => {search_products()}} className='search_button'>
              <FaSearch className='search_icon'/>
            </button>
            <input onChange={(e) => {setSearch(e.target.value)}} value={Search} placeholder='Chave de fenda' className='search_input'/>
          </div>
          </div>
        </section>

        { Display &&
          <section className='products'>
            <h2 className='Titulo pesquisa'>
              Produtos Relacionados a {ActualSearch}
            </h2>
        </section>}
      </main>
    </div>
  );
}

export default App;
