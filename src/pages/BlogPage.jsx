// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'blogPosts'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(list);
      } catch (e) {
        console.error('Error fetching posts', e);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="blog-page animate__animated animate__fadeInUp">
      <div className="blog-wrapper">
        <h2 className="blog-title">Blog</h2>
        <div className="blog-container">
          {posts.map((post) => (
            <div className="blog-card" key={post.id}>
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="blog-image" />
              )}
              <div className="blog-content">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-date">{post.date}</p>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="read-more-button">
                  Leer mas
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
