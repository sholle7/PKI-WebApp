"use client"
import React, { useState } from 'react';

const LoginBuyer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // handle login

    setUsername('');
    setPassword('');
  };

  return (
    <div className='homepage'>
      <div className='logo'>

      </div>

      <form onSubmit={handleSubmit} className='loginForm'>
        <label>
          Korisničko ime:
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </label>

        <label>
          Lozinka:
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>

        <button type='submit'>Prijavi se</button>
      </form>
    </div>
  );
};

export default LoginBuyer;