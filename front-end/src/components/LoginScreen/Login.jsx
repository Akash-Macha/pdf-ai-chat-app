import { useCallback, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const paperStyle = { padding: 20, minHeight: '30vh', width: 350, margin: "40px auto" }
const submitButtonStyle = { margin: '20px 0' }
const textFieldStyle = {
  margin: '10px 0',
};
const headingStyle = {
  margin: '0 0 10px 0',
}

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const validate = useCallback(() => {
    console.log('[validate] email = ', email);
    console.log('[validate] password = ', password);

    if (email === 'test@test.com' && password === 'test') {
      setError(null);
      navigate("/pdf-upload");

      console.log("Authenticated and navigating!");
    } else {
      setError('Please enter correct credentials.');
    }
  }, [email, password]);

  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <Grid align='center'>
          <LoginRoundedIcon color='primary' />
          <Typography variant='h5'>
            Login
          </Typography>
        </Grid>
        <TextField
          label='Email'
          variant="standard"
          placeholder='Enter email'
          fullWidth
          required
          style={textFieldStyle}
          error={!!error}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label='Password'
          variant="standard"
          placeholder='Enter password'
          type='password'
          fullWidth
          required
          style={textFieldStyle}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type='button'
          color='primary'
          variant="contained"
          style={submitButtonStyle}
          fullWidth
          onClick={validate}
        >
          Sign in
        </Button>
      </Paper>
    </Grid>
  )
}

export default Login;