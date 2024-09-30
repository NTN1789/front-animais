import React from 'react';
import './AnimalCard.css'; 

const AnimalCard = ({ animal }) => {
  return (
    <div className="animal-card">
      <h3>{animal.nome}</h3>
      <p><strong>Idade:</strong> {animal.idade}</p>
      <p><strong>Peso:</strong> {animal.peso} kg</p>
      <p><strong>Status:</strong> {animal.status}</p>
      <p><strong>Habitat:</strong> {animal.habitat}</p>
      <p><strong>Comportamento:</strong> {animal.comportamento}</p>
      <p><strong>Dieta:</strong> {animal.dieta}</p>
      <p><strong>Observação:</strong> {animal.observacao}</p>
    </div>
  );
};

export default AnimalCard;