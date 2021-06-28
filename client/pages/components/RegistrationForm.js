import React, { useState } from 'react';

import Button from './Button';

const Input = ({ title, value, onChange }) => {
  return (
    <div>
      <label>{title}</label>

      <input value={value} onChange={onChange} />

      <style jsx>{`
        div {
          border-bottom: 1px solid rgba(0, 0, 0, 0.13);
          margin: 0 -14px;
          padding: 0 14px;
        }
        div:first-of-type {
          border-top: 1px solid rgba(0, 0, 0, 0.13);
        }
        label {
          font-size: 13px;
          color: rgba(81, 81, 112, 0.66);
          text-transform: uppercase;
          display: block;
          margin-top: 8px;
        }
        input {
          width: 100%;
          box-sizing: border-box;
          font-size: 17px;
          padding-top: 8px;
          padding-bottom: 13px;
          border: none;
        }
        input:focus {
          border: none;
          outline: none;
        }
      `}</style>
    </div>
  );
};

const RegistrationForm = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [gravatarEmail, setGravatarEmail] = useState('');
  const [bio, setBio] = useState('');

  const createUser = () => {};

  return (
    <form onSubmit={createUser}>
      <h3>Create your account</h3>

      <Input
        title='First name'
        onChange={(e) => setFirstName(e.target.value)}
      />

      <Input title='Last name' onChange={(e) => setLastName(e.target.value)} />

      <Input
        title='Desired username'
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        title='Gravatar email'
        onChange={(e) => setGravatarEmail(e.target.value)}
      />

      <Input title='Bio' onChange={(e) => setBio(e.target.value)} />

      <footer>
        <Button onClick={createUser}>Create</Button>
      </footer>

      <style jsx>{`
        h3 {
          padding-bottom: 10px;
        }
        footer {
          text-align: right;
          padding-top: 16px;
        }
      `}</style>
    </form>
  );
};

export default RegistrationForm;
