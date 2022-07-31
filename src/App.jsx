import {useState, useEffect} from 'react'
import axios from 'axios'

import './styles.css'

import pokedex from '../assets/pokedex.png'

function App() {
  
  const [id,setId] = useState(1)
  const [nome,setNome] = useState('')
  const [num,setNum] = useState(0)
  const [image,setImage] = useState('')
  const [searchName,setSearchName] = useState('')
  const [types, setTypes] = useState([])

  useEffect(() =>{
    async function search(){
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      setNome(response.data.name)
      setNum(response.data.order)
      setImage(response.data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"])
      
      let num_types = response.data['types'].length

      for(let index = 0; index < num_types; index++) {
        const type = response.data['types'][index]['type']['name']
        
      }

    }
    search()
  },[id])

  async function searchForName(){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
    setNome(response.data.name)
    setId(response.data.id)
    setNum(response.data.order)
    setImage(response.data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"])
  }

  function next(){
    let atual = id
    setId(atual+1)
    
  }

  function previous(){
    let atual = id
    setId(atual-1)
    
  }

  return (
    <main>
      <img src={image} className="pokemonImage"></img>

      <h1 className='pokemonData'>
        <span className='pokemonNumber'>{num}</span> -
        <span className="pokemonName">{nome}</span>
      </h1>

      <div className='btn'>
        <button onClick={previous} className="ant">-</button>
        <button onClick={next} className="next">+</button>
      </div>

      <input type='search' placeholder='search' onChange={e => setSearchName(e.target.value)}></input>
      <button className='search' onClick={searchForName}>o</button>

      <img src={pokedex} className="pokedex"></img>
    </main>
  )
}

export default App
