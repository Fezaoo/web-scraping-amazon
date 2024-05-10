import './App.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios'
import ProductList from './ProductList';

function App() {
  const [Loading, setLoading] = useState(false) // Animação de Loading
  const [Search, setSearch] = useState('') // Input 
  const [ActualSearch, setActualSearch] = useState('') // Query realizada
  const [Display, setDisplay] = useState(true) // Exibe o container dos produtos
  const [Data, setData] = useState() // Resposta da API
  const [Limit, setLimit] = useState(1) // Limite de produtos a serem pesquisados

  function search_products() {
    if (Search === '') { alert('Insira um produto para pesquisa!') } // Tratamento de erro para input vazio
    else {
      console.log(Search)
      setLoading(true)
      if (!Display) { setDisplay(true) }
      setActualSearch(Search)
      axios.get(`http://localhost:3000/api/dados?query=chave&limit=1`) // Requisição da API.  
        .then(response => {
          setData(response.data)
          console.log('Dados recebidos:', response.data);
          if (response.data === null || response.data.length === 0) { alert('Não foi possível encontrar produtos') } // Tratamento de erro
          setLoading(false)
        })
        .catch(error => { // Tratamento de erro caso a requisição da API falhe
          console.error('Erro ao buscar dados:', error);
          setLoading(false)
          alert('Não foi possível procurar os produtos, erro com o servidor')
        });
    }
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
              <input maxLength={60} onChange={(e) => { setSearch(e.target.value) }} value={Search} placeholder='Chave de fenda' className='search_input' onKeyDown={(e) => { if (e.key === 'Enter') { search_products() } }} />
              <div>
                <select defaultValue={Limit} className='limit_select'  onChange={(e) => { setLimit(e.target.value) }}>
                  <option value={1}>1</option>
                  <option value={3}>3</option>
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
