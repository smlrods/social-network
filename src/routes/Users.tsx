import { forwardRef, useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { Avatar, Box, CircularProgress, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { UserProps } from "../App";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { isLoading, error, data, hasNextPage, fetchNextPage } = useUsers();
  const [users, setUsers] = useState<UserProps[]>([]);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (data) {
      let updatedUsers: UserProps[] = [];
      data.pages.forEach((page: any) => {
        updatedUsers = updatedUsers.concat(page.users);
      });
      setUsers(updatedUsers);
    }
  }, [data]);

  return (
    <>
      <Container maxWidth="sm" sx={{ marginY: '50px' }}>
        <Typography variant="h4">
          Users
        </Typography>
        {isLoading || error ?
          (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>) : (
            <List>
              {users.map((user: UserProps, index: number) => {
                return (
                  <User
                    key={user._id}
                    user={user}
                    ref={users.length - 1 === index ? ref : null}
                  />
                )
              })}
            </List>
          )
        }
      </Container>
    </>
  );
}

const User = forwardRef(({ user }: { user: UserProps }, ref) => {
  const navigate = useNavigate();

  return (
    <Box ref={ref}>
      <ListItem>
        <ListItemButton
          onClick={() => navigate(`/profile/${user._id}`)}>
          <ListItemAvatar>
            <Avatar
              alt={user.username}
              src={user.profile_image} />
          </ListItemAvatar>
          <ListItemText
            sx={{ textTransform: 'capitalize' }}
            primary={`${user.first_name} ${user.last_name}`}
          />
        </ListItemButton>
      </ListItem>
    </Box>
  )
});

export default Users;
