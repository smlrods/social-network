import { Box, Button, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useOutletContext, useRevalidator } from "react-router-dom";
import api from "../api";
import { LoadingButton } from "@mui/lab";

const Index = () => {
  const user = useOutletContext();
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user: { username: string, password: string }) => {
      return api.auth.login(user);
    },
    onSuccess: () => {
      revalidator.revalidate();
      navigate('/home');
    }
  });

  const handleGuestLogin = () => {
    mutation.mutate({ username: 'guest', password: '123' });
  }

  return (
    <Container
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'monospace',
          fontWeight: '700',
          letterSpacing: '.9rem',
          wordSpacing: '0.1rem',
        }}
      >
        Social Network
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        Connect with friends and the world around you on Social Network.
      </Typography>
      <Box>
        {user ?
          <Button variant="outlined" size="large" href="/home">Go to Homepage</Button> :
          <>
            <Button sx={{ margin: 1 }} variant="contained" size="large" href="/login">Log in</Button>
            <Button sx={{ margin: 1 }} variant="contained" size="large" href="/signup">Sign up</Button>
            <Box>
              <LoadingButton
                variant="outlined"
                size="small"
                fullWidth
                loading={mutation.isLoading}
                onClick={handleGuestLogin}
              >
                Guest Login
              </LoadingButton>
            </Box>
          </>
        }
      </Box>
    </Container>
  )
}

export default Index;
