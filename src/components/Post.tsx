import { forwardRef, useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar, CardMedia, CardActions, IconButton, Button, Collapse, Box, Link } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import useLikes from '../hooks/useLikes';
import { useMutation } from '@tanstack/react-query';
import api from '../api';
import { UserProps } from '../App';
import Comments from './Comments';
import { decode } from 'html-entities';
import { useNavigate } from 'react-router-dom';

interface PostProps {
  author: UserProps,
  body: string,
  imageURL?: string,
  postid: string,
  loggedInUserId?: string,
}

const Post = forwardRef(({ body, author, imageURL, postid, loggedInUserId }: PostProps, ref) => {
  let { isLoading, error, data, refetch } = useLikes(postid);

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState<string | null>(null);

  const createLike = useMutation({
    mutationFn: (postid: string) => {
      return api.posts.createLike(postid);
    },
    onSuccess: (data) => {
      setLiked(data.like._id);
      refetch();
    }
  })

  const deleteLike = useMutation({
    mutationFn: (likeid: string) => {
      return api.likes.deleteLike(likeid);
    },
    onSuccess: () => {
      setLiked(null);
      refetch();
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const handleLikeClick = () => {
    if (liked) return deleteLike.mutate(liked);
    createLike.mutate(postid);
  }

  useEffect(() => {
    if (data && data.likes.length) {
      const like = data.likes.find((like: any) => like.user === loggedInUserId);
      like ? setLiked(like._id) : null;
    }
  }, [data]);

  return (
    <Box ref={ref}>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${author._id}`)} src={author.profile_image} />}
          title={<Link color={'black'} fontWeight={'bold'} underline='none' href={`/profile/${author._id}`}>{`@${author.username}`}</Link>}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary" component="p">
            {decode(body)}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height={'auto'}
          image={imageURL ? imageURL : ''}
        />

        <CardActions disableSpacing>
          <IconButton disabled={(isLoading || Boolean(error))} onClick={handleLikeClick}>
            {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </IconButton>
          {isLoading || error ? '' : data?.likes.length}
          <Button onClick={handleExpandClick} sx={{ marginLeft: 'auto' }}>
            Comments
          </Button>
        </CardActions>
        <Collapse
          in={expanded}
          timeout='auto'
          unmountOnExit
        >
          <Comments postid={postid} />
        </Collapse>
      </Card>
    </Box>
  );
});


export default Post;
