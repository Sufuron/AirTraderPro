// src/components/BlogPreview.jsx
import React, { useEffect, useState } from "react";
import "./BlogPreview.css";

const fetchPosts = async () => {
  const res = await fetch("http://localhost:5000/api/blog");
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
};

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data.slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="blog-preview">
      <div className="blog-wrapper">
        <h2 className="blog-title">Ultimos Articulos</h2>
        <div className="blog-container">
          {posts.map((post) => (
            <div className="blog-card" key={post.id}>
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
