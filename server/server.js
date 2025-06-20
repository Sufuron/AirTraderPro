require('dotenv').config(); // Load variables from .env into process.env
// ... rest of your server.js code
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');



// Initialize Firebase Admin using a service account provided via environment variable
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT ?
  JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) : null;
if (!serviceAccount) {
  console.error('FIREBASE_SERVICE_ACCOUNT environment variable not set');
  process.exit(1);
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Multer setup for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Firestore collections
const planesCollection = db.collection('planes');
// Use a single collection for blog posts
const blogCollection = db.collection('blogPosts');

// No custom login endpoint. Clients authenticate with Firebase directly.

// ✅ **Middleware: Protect API Routes**
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// ✅ **GET planes**
// Fetch all planes from Firestore
app.get('/api/planes', async (req, res) => {
  try {
    const snapshot = await planesCollection.get();
    const planes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(planes);
  } catch (error) {
    console.error('Error fetching planes', error);
    res.status(500).json({ message: 'Error fetching planes' });
  }
});

// ✅ **POST (Create Plane) (Protected Route)**
app.post('/api/planes', verifyToken, upload.array('images', 10), async (req, res) => {
  try {
    const planeData = JSON.parse(req.body.data);
    planeData.images = req.files.map(file => `/uploads/${file.filename}`);

    const docRef = await planesCollection.add(planeData);
    await docRef.update({ id: docRef.id });

    res.status(201).json({ id: docRef.id, ...planeData });
  } catch (error) {
    console.error('Error creating plane', error);
    res.status(500).json({ message: 'Error creating plane' });
  }
});

// Get single plane by ID
app.get('/api/planes/:id', async (req, res) => {
  try {
    const doc = await planesCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Plane not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching plane', error);
    res.status(500).json({ message: 'Error fetching plane' });
  }
});

// ✅ **GET blog posts**
app.get('/api/blog', async (req, res) => {
  try {
    const snapshot = await blogCollection.orderBy('date', 'desc').get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts', error);
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
});

// Get single blog post by ID
app.get('/api/blog/:id', async (req, res) => {
  try {
    const doc = await blogCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching post', error);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// ✅ **POST (Create Blog Post) (Protected Route)**
app.post('/api/blog', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const postData = JSON.parse(req.body.data);
    if (req.file) {
      postData.image = `/uploads/${req.file.filename}`;
    }
    const docRef = await blogCollection.add(postData);
    await docRef.update({ id: docRef.id });
    res.status(201).json({ id: docRef.id, ...postData });
  } catch (error) {
    console.error('Error creating post', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// ✅ **Deploy Port Config**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
