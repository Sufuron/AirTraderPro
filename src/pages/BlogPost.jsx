import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPost.css';
import { getBlogPost } from '../utils/firestore';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getBlogPost(id)
      .then(setPost)
      .catch(() => setPost(null));
  }, [id]);

  if (!post) {
    return (
      <section className="blog-post">
        <div className="blog-wrapper">
          <p>Post no encontrado.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-post">
      <div className="blog-wrapper">
        <h2 className="blog-title">{post.title}</h2>
        <p className="blog-card-date">{post.date}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="blog-image" />
        )}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
};

export default BlogPost;
