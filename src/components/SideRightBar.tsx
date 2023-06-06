import { Avatar, Box, CircularProgress, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, ListItemAvatar, Link } from "@mui/material";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import useFriends from "../hooks/useFriends";
import { UserProps } from "../App";
import useRequest from "../hooks/useRequest";
import CheckIcon from '@mui/icons-material/Check';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

const SideRightBar = () => {

  return (
    <Grid item xs={3}>
      <Requests />
      <Contacts />
    </Grid>
  );
}

const Requests = () => {
  const { isLoading, error, data } = useRequest();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateRequest = useMutation({
    mutationFn: (request: { id: string, status?: string }) => (
      api.requests.updateRequest(request.id)
    ),
    onSuccess: () => queryClient.refetchQueries()
  })

  return (
    <>
      <Typography variant="h6" component='div'>
        Requests
      </Typography>
      <List sx={{ maxHeight: 100 }}>
        {isLoading || error ?
          <Box
            sx={{
              display: 'flex',
              height: '100px',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CircularProgress />
          </Box> :
          data?.requests.length ?
            data?.requests.map(({ user, _id }: { user: UserProps, _id: string }) => {
              return (
                <ListItem
                  key={user._id}
                  secondaryAction={
                    <IconButton
                      onClick={() => updateRequest.mutate({
                        id: _id
                      })}
                      edge="end"
                    >
                      <CheckIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar >
                    <Avatar sx={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${user._id}`)} alt='Profile Image' src={user.profile_image} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ textTransform: 'capitalize' }}
                    primary={
                      <Link
                        href={`/profile/${user._id}`}
                        fontWeight={'bold'}
                        color={'black'}
                        underline='none'
                      >
                        {`${user.first_name} ${user.last_name}`}
                      </Link>
                    }
                  />
                </ListItem>
              )
            }) : <NoMoreToShow message="No requests to show" />
        }
      </List>

    </>
  )
}

const NoMoreToShow = ({ message }: { message: string }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px'
        }}
      >
        <Typography variant="body1">
          {message}
        </Typography>
      </Box>
    </>
  )
}

const Contacts = () => {
  const user = useRouteLoaderData('root');
  const navigate = useNavigate();
  const { isLoading, error, data } = useFriends(user._id);

  return (
    <>
      <Typography variant="h6" component='div'>
        Contacts
      </Typography>
      <List sx={{ maxHeight: 100 }}>
        {isLoading || error ?
          <Box
            sx={{
              display: 'flex',
              height: '100px',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CircularProgress />
          </Box> :
          data.friends.length ?
            data.friends.map(({ friend }: { friend: UserProps }) => {
              return (
                <ListItem key={friend._id}>
                  <ListItemButton onClick={() => navigate(`/profile/${friend._id}`)} >
                    <ListItemIcon>
                      <Avatar alt='Profile Image' src={friend.profile_image} />
                    </ListItemIcon>
                    <ListItemText sx={{ textTransform: 'capitalize' }} primary={`${friend.first_name} ${friend.last_name}`} />
                  </ListItemButton>
                </ListItem>
              )
            }) : <NoMoreToShow message="No contacts yet" />
        }
      </List>
    </>
  );
}

export default SideRightBar;
