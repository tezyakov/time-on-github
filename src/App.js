import React from 'react';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { Form, Field } from 'react-final-form';

import styles from './styles.module.css';


const App = () => {
  const [regDate, setRegDate] = React.useState(0);
  const [dateDiff, setDateDiff] = React.useState(null);

  React.useEffect(() => {
    if (regDate) {
      const dateDifference = formatDistance(
        new Date(),
        new Date(regDate),
      );
      setDateDiff(dateDifference)
    }
  }, [regDate]);

  const getRegDate = async login => {
    const data = await axios.get(`https://api.github.com/users/${login}`);
    const date = data.data.created_at;
    setRegDate(date);
  };

  const onSubmit = async values => {
    await getRegDate(values.login);
  };

  return (
    <div className={styles.container}>
      <div className={styles.result}>{dateDiff || ''}</div>
      <Form
        className={styles.form}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Login</label>
            <Field
              name="login"
              component="input"
              type="text"
              placeholder="Login"
            />
          </div>
          <div>
            <button type="submit">
              Submit
            </button>      
          </div>
        </form>
      )}
    />
  </div>
  );
};

export default App;