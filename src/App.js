import React from 'react';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { Form, Field } from 'react-final-form';

import './App.css';


const App = () => {
  const [regDate, setRegDate] = React.useState(0);
  const [dateDiff, setDateDiff] = React.useState(0);

  const getRegDate = async login => {
    try {
      const data = await axios.get(`https://api.github.com/users/${login}`);
      const date = data.data.created_at;
      setRegDate(date);
    } catch (e) {
        console.log(e);
    } 
  };

  const dateDifference = formatDistance(
    new Date(),
    new Date(regDate),
  );

  const onSubmit = async values => {
    await getRegDate(values.login);
    setDateDiff(dateDifference);
  };
  
  return (
    <div className="container">
      <div className="a">{dateDiff}</div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="form">
              <label>Login</label>
              <Field
                name="login"
                component="input"
                type="text"
                placeholder="Login"
              />
            </div>
            <div className="button">
              <button type="submit">
                Submit
              </button>      
            </div>
          </form>
        )}
      />
    </div>
  );
}

export default App;
