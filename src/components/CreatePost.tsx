import { Avatar, Box, Card, CardHeader, CircularProgress, Collapse, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import api from "../api";

const CreatePost = ({ refetch, userImage }: { refetch: any, userImage?: string }) => {
  const [postBody, setPostBody] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [expanded, setExpanded] = useState(false);

  const mutation = useMutation({
    mutationFn: (post: { body: string, image?: string }) => {
      return api.posts.createPost(post);
    },
    onSuccess: () => refetch(),
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.target.blur();

    const post: { body: string, image?: string } = { body: postBody };

    if (imageURL) post.image = imageURL;

    if (postBody) mutation.mutate(post);

    setPostBody('');
    setImageURL('');
  }

  const handleChange = (input: string, setState: any) => {
    setState(input);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={userImage ? userImage : ''} />}
        title={
          <form onSubmit={handleSubmit} method="POST">
            <TextField
              fullWidth
              label="What's happening?"
              required
              value={postBody}
              onFocus={handleExpandClick}
              onBlur={handleExpandClick}
              onChange={(event) => handleChange(event.target.value, setPostBody)}
              onKeyDown={(e) => { if (e.code === 'Enter') handleSubmit(e); }}
            />
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <TextField
                margin="normal"
                label="Image URL"
                fullWidth
                onFocus={handleExpandClick}
                onBlur={handleExpandClick}
                onChange={(event) => handleChange(event.target.value, setImageURL)}
                onKeyDown={(e) => { if (e.code === 'Enter') handleSubmit(e); }}
              />
            </Collapse>
          </form>
        }
      />
      <Collapse in={mutation.isLoading} timeout='auto' unmountOnExit>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress />
        </Box>
      </Collapse>
    </Card>
  )
}

export default CreatePost;
