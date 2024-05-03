import './App.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios'
import ProductList from './ProductList';
import { useEffect } from 'react';

function App() {
  const [Loading, setLoading] = useState(false)
  const [Search, setSearch] = useState('')
  const [ActualSearch, setActualSearch] = useState('')
  const [Display, setDisplay] = useState(true)
  const [Data, setData] = useState()

  function search_products () {
    console.log(Search)
    setLoading(true)
    if (!Display){setDisplay(true)}
    setActualSearch(Search)
    axios.get(`http://127.0.0.1:5000/api/dados?query=${Search}`)
    .then(response => {
      setData(response.data)
      console.log('Dados recebidos:', response.data);
      setLoading(false)
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
      setLoading(false)
    });
    console.log()
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
            <h2 className='titulo_pesquisa'>
              Produtos Relacionados a: {ActualSearch} <AiOutlineLoading3Quarters className={`loading_none ${Loading ? 'loading loading_animation':''}`}/> 
            </h2>
          <ProductList data={Data}/> 
        </section>}
      </main>
    </div>
  );
}

export default App;
