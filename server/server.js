const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const SECRET_KEY = "your_super_secret_key"; // Use a strong secret key

// Multer setup for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// File paths for data storage
const planesFile = path.join(__dirname, 'planes.json');
const blogFile = path.join(__dirname, 'blog.json');

// Admin credentials (replace with a secure database)
const adminUser = { username: "admin", password: "password123" };

// ✅ **Admin Login API (Returns JWT Token)**
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
});

// ✅ **Middleware: Protect API Routes**
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
};

// ✅ **GET planes**
app.get('/api/planes', (req, res) => {
  const planes = JSON.parse(fs.readFileSync(planesFile, 'utf-8'));
  res.json(planes);
});

// ✅ **POST (Create Plane) (Protected Route)**
app.post('/api/planes', verifyToken, upload.array('images', 10), (req, res) => {
  const planes = JSON.parse(fs.readFileSync(planesFile, 'utf-8'));
  const planeData = JSON.parse(req.body.data);

  planeData.id = Date.now();
  planeData.images = req.files.map(file => `/uploads/${file.filename}`);

  planes.push(planeData);
  fs.writeFileSync(planesFile, JSON.stringify(planes, null, 2));

  res.status(201).json(planeData);
});

// Get single plane by ID
app.get('/api/planes/:id', (req, res) => {
  const planes = JSON.parse(fs.readFileSync(planesFile, 'utf-8'));
  const plane = planes.find(p => p.id == req.params.id);
  if (!plane) {
    return res.status(404).json({ message: 'Plane not found' });
  }
  res.json(plane);
});

// ✅ **GET blog posts**
app.get('/api/blog', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(blogFile, 'utf-8'));
  res.json(posts);
});

// Get single blog post by ID
app.get('/api/blog/:id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(blogFile, 'utf-8'));
  const post = posts.find(p => p.id == req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

// ✅ **POST (Create Blog Post) (Protected Route)**
app.post('/api/blog', verifyToken, upload.single('image'), (req, res) => {
  const posts = JSON.parse(fs.readFileSync(blogFile, 'utf-8'));
  const postData = JSON.parse(req.body.data);

  postData.id = Date.now();
  if (req.file) {
    postData.image = `/uploads/${req.file.filename}`;
  }

  posts.unshift(postData);
  fs.writeFileSync(blogFile, JSON.stringify(posts, null, 2));

  res.status(201).json(postData);
});

// ✅ **Deploy Port Config**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
