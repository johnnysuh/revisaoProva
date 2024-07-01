import React, { useState } from 'react';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');

  const buscarEndereco = async () => {
    setErro('');
    setEndereco(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setErro('CEP não encontrado.');
      } else {
        setEndereco(data);
      }
    } catch (error) {
      setErro('Erro ao buscar o endereço. Tente novamente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarEndereco();
  };

  return (
    <div className="container">
      <h1>Busca de Endereço por CEP</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP"
          className="input"
        />
        <button type="submit" className="button">Buscar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}
      {endereco && (
        <div className="endereco">
          <p><strong>Rua:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.localidade}</p>
          <p><strong>Estado:</strong> {endereco.uf}</p>
        </div>
      )}
    </div>
  );
}
