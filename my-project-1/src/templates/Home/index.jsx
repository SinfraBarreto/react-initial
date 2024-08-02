/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import './styles.css';

import React, { Component } from 'react';

import { PostCard } from '../../components/PostCard';
import { Post } from '../../components/Posts/index';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from  '../../components/TextInput';


class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postAndPhotos = await loadPosts();
    this.setState({
       posts: postAndPhotos.slice(page, postsPerPage),
       allPosts: postAndPhotos,
      });

    }
    
    loadMorePosts = () => {
      const {
        page,
        postsPerPage,
        allPosts,
        posts
      } = this.state;
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
      posts.push(...nextPosts);

      this.setState({ posts, page: nextPage});
    }

    handleChange = (e)  => {
      const { value } = e.target;
      this.setState({ searchValue: value})
    }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue 
    ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    : posts;
    
    return (
      <section className='container'>
        <div class= 'search-container'>
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue}  handleChange={this.handleChange}/>
        </div>
      
         {filteredPosts.length > 0 && (
           <Post posts={filteredPosts} />
         )}
         {filteredPosts.length  === 0 && (
           <p>Não existe mais posts =( </p>
         )}

        <div className='button-container'>
          {!searchValue && (
            <Button
             text= 'Load more post'
             onClick={this.loadMorePosts}
             disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;




