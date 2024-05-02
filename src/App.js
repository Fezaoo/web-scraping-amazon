import './App.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios'


function App() {
  const [Search, setSearch] = useState('')
  const [ActualSearch, setActualSearch] = useState('')
  const [Display, setDisplay] = useState(false)
  const [ItemTitulo, setItemTitulo] = useState()
  const [ItemPreco, setItemPreco] = useState()
  const [ItemAvaliacao, setItemAvaliacao] = useState()

  function search_products () {
    console.log(Search)
    setDisplay(!Display)
    setActualSearch(Search)
    const query = Search
    axios.get(`http://127.0.0.1:5000/api/dados?query=${query}`)
    .then(response => {
      const data = response.data
      setItemTitulo(data['title'])
      setItemPreco(data['price'])
      setItemAvaliacao(data['rating'])
      console.log('Dados recebidos:', response.data);

    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
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
              Produtos Relacionados a: {ActualSearch}
            </h2>
            <div className='resultado_pesquisa'>
              <h3 className=''>
                {ItemTitulo}
              </h3>
              <div className='valores_pesquisa'>
                  <div className='item_preco valor_pesquisa'><h3 className='legenda_valor'>Preço</h3> {ItemPreco}</div>
                  <div className='item_avaliacao valor_pesquisa'><h3 className='legenda_valor'>Avaliações</h3> {ItemAvaliacao}</div>
              </div>
            </div>
        </section>}
      </main>
    </div>
  );
}

export default App;
