import { Avatar, Card, CardContent, CardHeader, Container, Link, Typography } from "@mui/material";
import { decode } from "html-entities";
import { UserProps } from "../App";
import { useNavigate } from "react-router-dom";

interface CommentProps {
  author: UserProps,
  body: string,
}

const Comment = ({ author, body }: CommentProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              alt='Profile Image'
              sx={{ cursor: 'pointer' }}
              src={author.profile_image}
              onClick={() => navigate(`/profile/${author._id}`)}
            />
          }
          title={<Link color={'black'} fontWeight={'bold'} underline='none' href={`/profile/${author._id}`}>{`@${author.username}`}</Link>}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {decode(body)}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Comment;
