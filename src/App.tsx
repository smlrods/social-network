import Appbar from './components/Appbar'
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

export interface UserProps {
  username: string,
  profile_image?: string,
  first_name: string,
  last_name: string,
  _id?: string
}

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});


function App() {
  const user = useLoaderData() as UserProps;

  return (
    <Box minHeight={'100vh'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Appbar user={user} />
        <Outlet context={user} />
      </ThemeProvider>
    </Box>
  )
}

export default App
