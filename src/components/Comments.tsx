import { Box, CircularProgress, Container, FormControl, Input, InputAdornment, InputLabel, Stack, Typography } from "@mui/material";
import useComments from "../hooks/useComments";
import Comment from "./Comment";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { UserProps } from "../App";

const Comments = ({ postid }: { postid: string }) => {
  let { isLoading, error, data, refetch } = useComments(postid);

  return (
    <Stack spacing={2} sx={{ marginBottom: '20px' }}>
      {!isLoading && <AddCommentInput postid={postid} refetch={refetch} />}
      {isLoading || error ?
        (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>) :
        data.comments.length ?
          <>
            {data.comments.map((comment: { body: string, user: UserProps, _id: string }) => {
              return <Comment key={comment._id} author={comment.user} body={comment.body} />
            })}
          </>
          :
          (<>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <Typography variant='h6' color="primary">
                No Comments yet
              </Typography>
            </Box>
          </>)
      }
    </Stack>

  )
}

const AddCommentInput = ({ postid, refetch }: { postid: string, refetch: any }) => {
  const [commentInput, setCommentInput] = useState('');

  const mutation = useMutation({
    mutationFn: (comment: { body: string }) => {
      return api.posts.createComment(postid, comment);
    },
    onSuccess: () => refetch(),
  })

  const handleChange = (event: any) => {
    setCommentInput(event.target.value);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutation.mutate({ body: commentInput });
    setCommentInput('');
  }

  return (
    <Container >
      <FormControl component={'form'} onSubmit={handleSubmit} fullWidth variant="standard">
        <InputLabel htmlFor="write-comment">
          Write a comment...
        </InputLabel>
        <Input
          id='write-comment'
          onChange={handleChange}
          value={commentInput}
          startAdornment={
            <InputAdornment position='start'>
              <SendIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </Container>
  );
}

export default Comments;
