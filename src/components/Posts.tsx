import { Box, CircularProgress, Container, Typography } from "@mui/material";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { UserProps } from "../App";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

interface PostProps {
  body: string,
  __v: number,
  _id: string,
  image?: string,
  user: UserProps
}

const Posts = ({ user, useQuery }: { user: any, useQuery: any }) => {
  const { isLoading, error, data, refetch, hasNextPage, fetchNextPage } = useQuery(user._id);
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const loggedInUser = useRouteLoaderData('root') as UserProps;

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (data) {
      let updatedPosts: PostProps[] = [];
      data.pages.forEach((page: any) => {
        updatedPosts = updatedPosts.concat(page.posts);
      });
      setPosts(updatedPosts);
    }
  }, [data]);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {user._id === loggedInUser._id ?
        <CreatePost refetch={refetch} userImage={user.profile_image} /> : null
      }
      {isLoading || error ?
        (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>) : (
          posts.length && !isLoading ?
            posts.map((post: PostProps, index: number) => {
              return (
                <Post
                  key={post._id}
                  author={post.user}
                  postid={post._id}
                  body={decodeURIComponent(post.body)}
                  imageURL={post.image ? post.image : undefined}
                  loggedInUserId={loggedInUser._id}
                  ref={posts.length - 1 === index ? ref : null}
                />
              )
            }) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Typography variant='h6' color="primary">
                  No posts yet
                </Typography>
              </Box>
            )
        )
      }
      {!hasNextPage && !isLoading && Boolean(posts.length) &&
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography variant='h6' color="primary">
            There are no more posts to show
          </Typography>
        </Box>}
    </Container>
  );
}

export default Posts;
