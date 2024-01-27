
import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const validate = useCallback(() => {
    console.log('validate = ', email);
    console.log('validate = ', password);

    if (email === 'test@test.com' && password === 'test') {
      setError(null);
      navigate("/chat-with-pdf");

      console.log("Authenticated and navigating!");
    } else {
      setError('Please enter correct credentials.');
    }
  }, [email, password]);

  return (
    <>
      <div className="card">
        <TextField id="email" label="Email" variant="standard" onChange={(event) => setEmail(event.target.value)} />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={(event) => setPassword(event.target.value)}
        />
        {error ? <p className='error'>{error}</p> : null}
        <button onClick={validate}>
          Login
        </button>
      </div>
    </>)
}

export default Login;