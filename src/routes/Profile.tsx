import { useLoaderData } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import Header from "../components/Profile/Header";
import Friends from "../components/Profile/Friends";
import Posts from "../components/Posts";
import usePostsUser from "../hooks/usePostsUser";

const Profile = () => {
  const user = useLoaderData();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header user={user} />
        </Grid>
        <Grid item xs={5}>
          <Friends user={user} />
        </Grid>
        <Grid item xs={7}>
          <Posts user={user} useQuery={usePostsUser} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
