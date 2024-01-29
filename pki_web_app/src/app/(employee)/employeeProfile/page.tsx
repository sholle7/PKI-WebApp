"use client"
import { users } from '@/database/database'
import { User } from '@/models/User'
import { useStores } from '@/stores/useStores'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

const EmployeeProfile = observer(() => {
  const { userStore } = useStores();
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() =>  {
    const loggedUser: User | null = JSON.parse(localStorage.getItem("user")!);
    setEditedUser(loggedUser);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (editedUser) {
      const updatedUser: User = { ...editedUser, [field]: value };
      setEditedUser(updatedUser);
    }
  };

  const saveData = () => {
    if (editedUser && newPassword === repeatedNewPassword) {
      
      if (newPassword.trim() !== "") {
        editedUser.password = newPassword
      }

      localStorage.setItem("user", JSON.stringify(editedUser));
      userStore.loggedUser = editedUser;

      const index = users.findIndex((user) => user.id === editedUser.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...editedUser };
      }

      setNewPassword("");
      setRepeatedNewPassword("");
    } else {
      console.error("Unesene lozinke se ne podudaraju ili postoje neispravni unosi.");
    }
  };

  return (
    <div className='profileContainer'>
      <h1>Informacije o korisniku</h1>
      
      <div className='inputWrapper'>
        <label>
          Korisničko ime:
          <input
            type='text'
            value={editedUser?.username || ""}
            readOnly
            required
          />
        </label>
      </div>

      <div className='inputWrapper'>
        <label>
          Ime:
          <input
            type='text'
            value={editedUser?.firstName || ""}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
          />
        </label>
      </div>

      <div className='inputWrapper'>
        <label>
          Prezime:
          <input
            type='text'
            value={editedUser?.lastName || ""}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
        </label>
      </div>

      <div className='inputWrapper'>
        <label>
          Kontakt telefon:
          <input
            type='text'
            value={editedUser?.contactNumber || ""}
            onChange={(e) => handleInputChange("contactNumber", e.target.value)}
            required
          />
        </label>
      </div>

      <div className='inputWrapper'>
        <label>
          Adresa:
          <input
            type='text'
            value={editedUser?.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
          />
        </label>
      </div>

      <div className='inputWrapper'>
        <label>
          Lozinka:
          <input
            type='password'
            value={editedUser?.password || ""}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
          />
        </label>
      </div>

      <div className='inputWrapper'>
        <label>
          Nova lozinka:
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Unesite novu lozinku'
            required
          />
        </label>
      </div>

      <div className='inputWrapper'>
        <label>
          Potvrda nove lozinke:
          <input
            type='password'
            value={repeatedNewPassword}
            onChange={(e) => setRepeatedNewPassword(e.target.value)}
            placeholder='Potvrdite novu lozinku'
            required
          />
        </label>
      </div>

      <button className='submitButton' onClick={() => saveData()}>Sacuvaj</button>
    </div>
  );
});

export default EmployeeProfile;
