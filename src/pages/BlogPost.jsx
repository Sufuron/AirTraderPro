import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPost.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, 'blogPosts', id));
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() });
        } else {
          setPost(null);
        }
      } catch (e) {
        console.error('Error fetching post', e);
        setPost(null);
      }
    };
    fetchPost();
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
