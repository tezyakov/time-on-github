import React from 'react';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { Form, Field } from 'react-final-form';

import styles from './styles.module.css';


const App = () => {
  const [regDate, setRegDate] = React.useState(0);
  const [dateDiff, setDateDiff] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [error, setError] = React.useState(null);

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
    try {
      const data = await axios.get(`https://api.github.com/users/${login}`);
      console.log(data);
      const date = data.data.created_at;
      setRegDate(date);
    } catch (e) {
        if (e.response.status === 404) {
          setError('Oops, looks like this account does not exist')
        } else if (e.response.status === 403) {
          setError('Sorry, you can make only 60 requests per hour')
        } else if (e.response.status) {
          setError('Unknown error')
        }
    }
  };

  const onSubmit = async values => {
    setError(null);
    if (!values.login) {
      setError('Field is required');
    }
    setRegDate(null);
    setName(values.login);
    await getRegDate(values.login);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Enter your GitHub login here:</div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              className={styles.field}
              name="login"
              component="input"
              type="text"
              placeholder="Login"
            />
          </div>
          <div>
            <button className={styles.button}>
              Submit
            </button>      
          </div>
        </form>
        )}
      />
      <div className={styles.error}>{error ? `${error}` : ''}</div>
      <div className={styles.result}>{regDate && name !== undefined  ? `${name} is ${dateDiff} on GitHub`: ''}</div>
    </div>
  );
};

export default App;