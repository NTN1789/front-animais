import React, { useState, useEffect } from 'react';

import "../styles/animal.css"

import "../styles/button.css"
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
  const [editId, setEditId] = useState(null); 

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
      const url = editId 
        ? `http://localhost:3000/animais/${editId}` 
        : 'http://localhost:3000/animais';          
      
      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
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

      if (editId) {
    
        setAnimais(animais.map(animal => (animal.id === editId ? data : animal)));
        alert('Animal atualizado com sucesso!');
      } else {
       
        setAnimais([...animais, data]);
        alert('Animal cadastrado com sucesso!');
      }


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
      setEditId(null); 

    } catch (error) {
      console.error('Erro ao cadastrar/atualizar animal:', error.message);
      alert('Erro ao cadastrar/atualizar animal: ' + error.message);
    }
  };

  const handleEdit = (animal) => {
    setFormData({
      nome: animal.nome,
      idade: animal.idade,
      peso: animal.peso,
      status: animal.status,
      habitat: animal.habitat,
      comportamento: animal.comportamento,
      dieta: animal.dieta,
      observacao: animal.observacao
    });
    setEditId(animal.id); 
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
        <h2>{editId ? 'Editar Animal' : 'Cadastro de Animal'}</h2>
      
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
        <button type="submit">{editId ? 'Atualizar Animal' : 'Cadastrar Animal'}</button>
      </form>

      <h2>Animais Cadastrados</h2>
      <div className="animal-list">
        {animais.map((animal, index) => (
          <div key={index}> 
            <AnimalCard animal={animal} />
            <button className="edit-btn" onClick={() => handleEdit(animal)}>Editar</button>
      <button className="delete-btn" onClick={() => handleDelete(animal.id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalForm;