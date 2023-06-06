import { Box, Button, Container, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Index = () => {
  const user = useOutletContext();

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
        }}
        gutterBottom
      >
        Welcome
      </Typography>
      <Box>
        {user ?
          <Button variant="outlined" size="large" href="/home">Go to Homepage</Button> :
          <>
            <Button sx={{ marginX: 1 }} variant="outlined" size="large" href="/login">Log in</Button>
            <Button sx={{ marginX: 1 }} variant="outlined" size="large" href="/signup">Sign up</Button>
          </>
        }
      </Box>
    </Container>
  )
}

export default Index;
