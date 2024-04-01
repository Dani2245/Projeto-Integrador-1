import React from 'react';
import './agendamento.scss';

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Agendamento de Serviços</h1>
      </header>
      <main>
        <form action="#" method="POST">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="phone">Telefone:</label>
          <input type="tel" id="phone" name="phone" required />

          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" name="cpf" required />

          <label htmlFor="service">Serviço:</label>
          <select id="service" name="service" required>
            <option value="corte">Corte de Cabelo</option>
            <option value="coloracao">Coloração</option>
            <option value="alisamento">Alisamento</option>
          </select>

          <label htmlFor="date">Data:</label>
          <input type="date" id="date" name="date" required />

          <label htmlFor="time">Horário:</label>
          <input type="time" id="time" name="time" required />

          <input type="submit" value="Agendar" />
        </form>
      </main>
      <footer>
        <img src="content/images/logo.jpeg" alt="Logo do salão" />
      </footer>
    </div>
  );
};

export default App;
