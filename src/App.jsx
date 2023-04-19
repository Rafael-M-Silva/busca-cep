import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Styles from './app.module.css'

function App() {
  const [cep, setCep] = useState()
  const [street, setStreet] = useState()
  const [city, setCity] = useState()
  const [state, setState] = useState()

  const [input, setInput] = useState()
  


  const handleChange = (event) => {
    setInput(event.target.value)
  }
  
  function cepSet() {
    
    const url = `https://viacep.com.br/ws/${input}/json/`;
    
    fetch(url)
    .then((response)=> response.json()) /* está pegando a requisição e tranformando para json */
    .then((data) => {

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

      setCep()
      setStreet()
      setCity()
      setState()
      
    });
      
  }

      
  
  return (
    <div className={Styles.App}>

      <header className={Styles.header}>
        <h1>Busca CEP</h1>
          <div>
            <div className={Styles.content}>
            <input onChange={handleChange} className={Styles.cep} type="text" placeholder="CEP" maxLength={8} value={input} />
            <button onClick={cepSet} className={Styles.search}><FaSearch/></button>
            </div>
          </div>
      </header>
    
    <div className={Styles.box}>
      <h1>{cep}</h1>
      <p>{street}</p>
      <p>{city}</p>
      <p>{state}</p>
    </div>

    </div>
  )
}

export default App
