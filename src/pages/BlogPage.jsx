// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const res = await fetch("http://localhost:5000/api/blog");
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
};

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="blog-page animate__animated animate__fadeInUp">
      <div className="blog-wrapper">
        <h2 className="blog-title">Blog</h2>
        <div className="blog-container">
          {posts.map((post) => (
            <div className="blog-card" key={post.id}>
              <img src={post.image} alt={post.title} className="blog-image" />
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
