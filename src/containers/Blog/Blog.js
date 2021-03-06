import React, { Component } from 'react';
import axios from "axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            // distribute the property of the post
            // that we get from the server
            ...post,
            author: "Kido"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        // console.log("Error", error);
        this.setState({ error: true });
      });
  }

  render() {
    const posts = this.state.posts.map(post => {
      return <Post 
        key={post.id}
        title={post.title}
        author={post.author} />
    });
    return (
      <div>
        <section className="Posts">
         {posts}
        </section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;