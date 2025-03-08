// src/pages/BlogPage.jsx
import React from "react";
import "./BlogPage.css";
import blogData from "../data/blogData";
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <section className="blog-page animate__animated animate__fadeInUp">
      <div className="blog-wrapper">
        <h2 className="blog-title">Blog</h2>
        <div className="blog-container">
          {blogData.map((post) => (
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
