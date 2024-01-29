"use client"
import { useStores } from '@/stores/useStores';
import React, { useState } from 'react';
import { users } from '@/database/database'
import { Roles } from '@/models/User';
import { useRouter } from 'next/navigation';

const loginEmployee = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userStore } = useStores();
  const router = useRouter();

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    users.forEach(user => {
      if(user.username == username && user.password == password && user.role == Roles.employee) {
        userStore.login(username, password)
        router.push("/employeeOrders");
      }
    });

    setUsername('');
    setPassword('');
  };

  return (
    <div className='homepage'>
      <div className='logo'>

      </div>

      <form onSubmit={handleSubmit} className='loginForm'>
        <div className='inputWrapper'>
          <label>
            Korisničko ime:
            <input
              type='text'
              value={username}
              placeholder='Unesite korisinicko ime'
              onChange={handleUsernameChange}
              required
            />
          </label>
        </div>

        <div className='inputWrapper'>
          <label>
            Lozinka:
            <input
              type='password'
              placeholder='Unesite lozinku'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
        </div>

        <button className='submitButton' type='submit'>Prijavi se</button>
      </form>
    </div>
  );
}

export default loginEmployee