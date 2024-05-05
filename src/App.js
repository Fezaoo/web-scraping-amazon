import './App.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios'
import ProductList from './ProductList';

function App() {
  const [Loading, setLoading] = useState(false)
  const [Search, setSearch] = useState('')
  const [ActualSearch, setActualSearch] = useState('')
  const [Display, setDisplay] = useState(true)
  const [Data, setData] = useState()
  const [Limit, setLimit] = useState(2)

  function search_products() {
    console.log(Search)
    setLoading(true)
    if (!Display) { setDisplay(true) }
    setActualSearch(Search)
    axios.get(`http://127.0.0.1:5000/api/dados?query=${Search}&limit=${Limit}`)
      .then(response => {
        setData(response.data)
        console.log('Dados recebidos:', response.data);
        setLoading(false)
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        setLoading(false)
        alert('Não foi possível procurar os produtos')
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
              <button onClick={(e) => { search_products() }} className='search_button'>
                <FaSearch className='search_icon' />
              </button>
              <input maxLength={60} onChange={(e) => { setSearch(e.target.value) }} value={Search} placeholder='Chave de fenda' className='search_input' onKeyDown={(e) => {if (e.key === 'Enter') {search_products()}}}/>
              <div>
                <select className='limit_select' value={Limit} onChange={(e) => { setLimit(e.target.value) }}>
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={999}>all</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        
        {Display &&
          <section className='products'>
            <h2 className='titulo_pesquisa'>
              Produtos Relacionados a: {ActualSearch} <AiOutlineLoading3Quarters className={`loading_none ${Loading ? 'loading loading_animation' : ''}`} />
            </h2>
            <ProductList data={Data} />
          </section>}
      </main>
    </div>
  );
}

export default App;
