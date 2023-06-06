import { Avatar, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import StoreIcon from '@mui/icons-material/Store';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";

const SideLeftBar = ({ user }: { user: unknown }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={3}>
      <List>
        <ListItem>
          <ListItemButton onClick={() => navigate(`/profile/${user._id}`)}>
            <ListItemIcon>
              <Avatar alt='Profile Image' src={user.profile_image} />
            </ListItemIcon>
            <ListItemText primary={`@${user.username}`} />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltOutlinedIcon fontSize='large' />
            </ListItemIcon>
            <ListItemText primary={'Friends'} />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemButton>
            <ListItemIcon>
              <GroupsIcon fontSize='large' />
            </ListItemIcon>
            <ListItemText primary={'Groups'} />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemButton>
            <ListItemIcon>
              <StoreIcon fontSize='large' />
            </ListItemIcon>
            <ListItemText primary={'Marketplace'} />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemButton>
            <ListItemIcon>
              <ExpandMoreIcon fontSize='large' />
            </ListItemIcon>
            <ListItemText primary={'See More'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Grid>
  )
}

export default SideLeftBar;
