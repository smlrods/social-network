import { Box, Container, CssBaseline, Divider, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import api from "../api";
import { UserProps } from "../api/auth";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user: UserProps) => {
      return api.auth.signup(user);
    },
    onSuccess: () => navigate('/login')
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    mutation.mutate({ username, password, first_name: firstName, last_name: lastName });

  }

  const handleChange = (input: string, setState: any) => {
    setState(input);
  }

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth='md'
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Typography gutterBottom variant="h4" component="h2">
          Sign up
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Box>
            <Box>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                type="text"
                required
                value={username}
                error={mutation.isError}
                onChange={(event) => handleChange(event.target.value, setUsername)}
              />
            </Box>
            <Box>
              <TextField
                margin="normal"
                label="First Name"
                type="text"
                required
                fullWidth
                value={firstName}
                error={mutation.isError}
                onChange={(event) => handleChange(event.target.value, setFirstName)}
              />
            </Box>
            <Box>
              <TextField
                margin="normal"
                label="Last Name"
                type="text"
                fullWidth
                required
                value={lastName}
                error={mutation.isError}
                onChange={(event) => handleChange(event.target.value, setLastName)}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                required
                value={password}
                error={mutation.isError}
                onChange={(event) => handleChange(event.target.value, setPassword)}
              />
              <TextField sx={{ display: 'none' }} />
            </Box>
          </Box>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={mutation.isLoading}
          >
            Sign up
          </LoadingButton>
        </form>
      </Container>
    </>
  );
}

export default Signup;
