import { Container, Grid } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import SideLeftBar from "../components/SideLeftBar";
import SideRightBar from "../components/SideRightBar";
import Posts from "../components/Posts";
import usePosts from "../hooks/usePosts";
import { UserProps } from "../App";

const HomePage = () => {
  const user = useOutletContext() as UserProps;

  return (
    <Container sx={{ marginY: '50px' }}>
      <Grid container >
        <SideLeftBar user={user} />
        <Grid item xs={6}>
          <Posts user={user} useQuery={usePosts} />
        </Grid>
        <SideRightBar />
      </Grid>
    </Container>
  );
};

export default HomePage;
