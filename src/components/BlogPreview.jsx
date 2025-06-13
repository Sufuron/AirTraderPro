// src/components/BlogPreview.jsx
import { useEffect, useState } from "react";
import "./BlogPreview.css";
import { getBlogPosts } from "../utils/firestore";

const fetchPosts = () => getBlogPosts();

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
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="blog-image" />
              )}
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
