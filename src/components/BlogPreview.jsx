// src/components/BlogPreview.jsx
import React from "react";
import "./BlogPreview.css";
import blogData from "../data/blogData";

const BlogPreview = () => {
  // For example, show only the first 3 posts as the "latest" articles.
  const latestPosts = blogData.slice(0, 3);

  return (
    <section className="blog-preview">
      <div className="blog-wrapper">
        <h2 className="blog-title">Ultimos Articulos</h2>
        <div className="blog-container">
          {latestPosts.map((post) => (
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
