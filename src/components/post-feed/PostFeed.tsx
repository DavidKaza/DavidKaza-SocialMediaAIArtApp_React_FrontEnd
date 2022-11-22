import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import Navbar from '../navbar/Navbar';
import { PostCard } from './PostCard';
import Post from '../../models/Post';
import { apiGetAllPosts } from '../../remote/social-media-api/postFeed.api';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import TextField from '@mui/material/TextField';
import {
  apiDeletePost,
  apiUpsertPost,
} from '../../remote/social-media-api/post.api';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useContext(UserContext);
  let welcomeText = 'Welcome!';
  let postForm = <></>;

  const handleDeleteP = async (post: Post) => {
    let res = await apiDeletePost(post);
    let allPosts = await apiGetAllPosts();
    setPosts(allPosts.payload);
    console.log(posts);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let payload = new Post(
      0,
      data.get('postText')?.toString() || '',
      data.get('postImage')?.toString() || '',
      [],
      user,
      []
    );
    await apiUpsertPost(payload);
    fetchData();
  };

  if (user) {
    postForm = (
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          id='postText'
          name='postText'
          label='Thoughts You Would Like to Share?'
          fullWidth
        />
        <TextField
          id='postImage'
          name='postImage'
          label='Add an Image or Diagram?'
          fullWidth
          variant='standard'
        />
        <Button
          type='submit'
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
          color='warning'
        >
          Create Post
        </Button>
      </Box>
    );

    welcomeText = `Welcome, ${user.firstName}!`;
  }
  const fetchData = async () => {
    const result = await apiGetAllPosts();
    setPosts(result.payload.reverse());
  };

  useEffect(() => {
    fetchData();
  }, []);

  let noPostsText = <></>;

  if (posts.length === 0) {
    noPostsText = (
      <h2 style={{ textAlign: 'center', marginTop: '3%', color: 'gray' }}>
        There are no posts, share your thoughts!
      </h2>
    );
  }

  return (
    <>
      <Navbar />
      <Container
        maxWidth='xl'
        sx={{
          backgroundColor: '#fff',
          height: 'auto',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>{welcomeText}</h2>
        <h3 style={{ textAlign: 'center' }}>
          Click below to go to your profile page
        </h3>
        <div style={{ textAlign: 'center' }}>
          <Link to={'/profile'}>Your Profile</Link>
        </div>
        {postForm}
      </Container>
      <Grid container justifyContent={'center'}>
        <Grid item sx={{ width: '60%', mb: '20px' }}>
          {posts.map((item) => (
            <PostCard post={item} key={item.postId} updatePosts={setPosts}>

              {user && item.author.id === user.id && (
                <Button
                  variant="text"

                  onClick={() => {
                    handleDeleteP(item);
                  }}
                >
                  <DeleteIcon></DeleteIcon>
                  {/* {item.postId} */}
                </Button>
              )}
            </PostCard>
          ))}
        </Grid>
      </Grid>
      {noPostsText}
    </>
  );
};
