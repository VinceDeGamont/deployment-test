// app/page.tsx
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Fetch data (Read)
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Submit data (Create)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
    // Refresh data manual/sederhana
    window.location.reload();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple User App (SQLite + Prisma)</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          style={{ marginRight: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}