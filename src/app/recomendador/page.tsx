'use client';

import { useState } from 'react';

export default function Page() {
  const [response, setResponse] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const options = ['Summer', 'Fall', 'Night_out', 'Rating'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelected(prev =>
      checked ? [...prev, value] : prev.filter(v => v !== value)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse('Cargando...');

    try {
      const res = await fetch('https://ui1qmq75di.execute-api.us-east-1.amazonaws.com/prod/principal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order: selected })
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse('Error al contactar la API');
      console.error(err);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Filtrar</h1>
      <form onSubmit={handleSubmit}>
        {options.map(opt => (
          <label key={opt} style={{ display: 'block' }}>
            <input type="checkbox" value={opt} onChange={handleChange} />
            {opt}
          </label>
        ))}
        <button type="submit" style={{ marginTop: '1rem' }}>Enviar</button>
      </form>
      <h2>Respuesta:</h2>
      <pre>{response}</pre>
    </main>
  );
}
