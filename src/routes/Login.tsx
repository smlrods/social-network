import { Container, CssBaseline, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user: { username: string, password: string }) => {
      return api.auth.login(user);
    },
    onSuccess: () => navigate('/home'),
  });

  const handleChange = (input: string, setState: any) => {
    setState(input);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutation.mutate({ username, password });
  }

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth='md'
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Typography gutterBottom variant="h4" component="h2">
          Log in
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form method="POST" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="username"
            required
            value={username}
            error={mutation.isError}
            onChange={(event) => handleChange(event.target.value, setUsername)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="password"
            type="password"
            required
            value={password}
            error={mutation.isError}
            helperText={mutation.isError ? "Username or password incorrect" : ''}
            onChange={(event) => handleChange(event.target.value, setPassword)}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={mutation.isLoading}
          >
            Log in
          </LoadingButton>
        </form>
      </Container>
    </>
  );
}

export default Login;
