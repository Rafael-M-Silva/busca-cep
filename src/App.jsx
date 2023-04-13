import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Styles from './app.module.css'

function App() {
  const [cep, setCep] = useState()
  const [street, setStreet] = useState()
  const [city, setCity] = useState()
  const [state, setState] = useState()

  let cepWanted = ''
  const handleChange = (event) => {
    cepWanted = event.target.value;
  }
  
  function cepSet() {
    
    const url = `https://viacep.com.br/ws/${cepWanted}/json/`;
    console.log(url);

    fetch(url)
    .then((response)=> response.json()) /* está pegando a requisição e tranformando para json */
    .then((data) => {
      console.log(data);  /* recebe os dados já convertidos em JSON e os imprime no console. */
    
      const cep = data.cep
      const street = data.logradouro
      const city = data.localidade
      const state = data.uf
      
      setCep(cep)
      setStreet(street)
      setCity(city)
      setState(state)
    })
    .catch((error) => { // Adicionei um catch para tratar erros
      console.error(error);
    });
  }

  return (
    <div className={Styles.App}>

      <header className={Styles.header}>
        <h1>Busca CEP</h1>
          <div>
            <div className={Styles.content}>
            <input onChange={handleChange} className={Styles.cep} type="text" placeholder="CEP" maxLength={8} />
            <button onClick={cepSet} className={Styles.search}><FaSearch/></button>
            </div>
          </div>
      </header>
    
    <div className={Styles.box}>
      <h1>{cep || "00000-000"}</h1>
      <p>{street || "Rua"}</p>
      <p>{city || "Cidade"}</p>
      <p>{state || "Estado"}</p>
    </div>

    </div>
  )
}

export default App
