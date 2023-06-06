import { Box, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, ImageList, ImageListItem, ImageListItemBar, Link, Paper, Typography } from "@mui/material";
import { UserProps } from "../../App";
import useFriends from "../../hooks/useFriends";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface FriendsProps {
  user: any,
}

const Friends = ({ user }: FriendsProps) => {
  const { isLoading, error, data } = useFriends(user._id);
  const navigate = useNavigate();

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography gutterBottom variant="h6">
        Friends
      </Typography>
      {isLoading || error ?
        (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>) :
        data.friends.length ?
          (<Grid container columns={3} spacing={1}>
            {data.friends.map((request, index) => (
              <Grid item xs={1} key={request.friend._id + index}>
                <Card>
                  <CardActionArea onClick={() => navigate(`/profile/${request.friend._id}`)}>
                    <CardMedia
                      component='img'
                      height='auto'
                      image={request.friend.profile_image}
                      alt='profile image'
                    />
                  </CardActionArea>
                  <CardActions >
                    <Typography
                      variant="body2"
                      href={`/profile/${request.friend._id}`}
                      underline="none"
                      component={Link}
                      sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                      color={'black'}
                    >
                      {`${request.friend.first_name} ${request.friend.last_name}`}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>) :
          (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <Typography variant='h6' color="primary">
              No Friends yet
            </Typography>
          </Box>)
      }
    </Paper>
  );
}

export default Friends;
