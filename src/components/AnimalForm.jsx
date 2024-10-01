import React, { useState, useEffect } from 'react';

import "../styles/animal.css"
import AnimalCard from "./animalCard/Card";

const AnimalForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    peso: '',
    status: '',
    habitat: '',
    comportamento: '',
    dieta: '',
    observacao: ''
  });

  const [animais, setAnimais] = useState([]);


  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const response = await fetch('http://localhost:3000/animais');
        const data = await response.json();
        setAnimais(data); 
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
      }
    };

    fetchAnimais();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/animais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro na resposta: ${response.statusText} - ${errorMessage}`);
      }

      const data = await response.json();
      setAnimais([...animais, data]);  

      alert('Animal cadastrado com sucesso!');

      setFormData({
        nome: '',
        idade: '',
        peso: '',
        status: '',
        habitat: '',
        comportamento: '',
        dieta: '',
        observacao: ''
      });

    } catch (error) {
      console.error('Erro ao cadastrar animal:', error.message);
      alert('Erro ao cadastrar animal: ' + error.message);
    }
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tens a certeza que deseja deletar este animal?');
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/animais/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Erro ao deletar o animal');
        }
  
        setAnimais(animais.filter(animal => animal.id !== id));
        alert('Animal deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar animal:', error.message);
        alert('Erro ao deletar animal: ' + error.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Animal</h2>
      
          <div>
            <label>Nome:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div>
            <label>Idade:</label>
            <input type="number" name="idade" value={formData.idade} onChange={handleChange} required />
          </div>
          <div>
            <label>Peso:</label>
            <input type="number" name="peso" value={formData.peso} onChange={handleChange} required />
          </div>
          <div>
            <label>Status:</label>
            <input type="text" name="status" value={formData.status} onChange={handleChange} required />
          </div>
          <div>
            <label>Habitat:</label>
            <input type="text" name="habitat" value={formData.habitat} onChange={handleChange} required />
          </div>
          <div>
            <label>Comportamento:</label>
            <input type="text" name="comportamento" value={formData.comportamento} onChange={handleChange} required />
          </div>
          <div>
            <label>Dieta:</label>
            <input type="text" name="dieta" value={formData.dieta} onChange={handleChange} required />
          </div>
          <div>
            <label>Observação:</label>
            <textarea name="observacao" value={formData.observacao} onChange={handleChange} required></textarea>
          </div>
        <button type="submit">Cadastrar Animal</button>
      </form>

      <h2>Animais Cadastrados</h2>
      <div className="animal-list">
        {animais.map((animal, index) => (
          <div> 
            <AnimalCard key={index} animal={animal} />
            <button onClick={() => handleDelete(animal.id)}>Deletar</button> 
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default AnimalForm;