const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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

// API to GET planes
app.get('/api/planes', (req, res) => {
  const planes = JSON.parse(fs.readFileSync('planes.json', 'utf-8'));
  res.json(planes);
});

// API to POST (create) plane
app.post('/api/planes', upload.array('images', 10), (req, res) => {
  const planes = JSON.parse(fs.readFileSync('planes.json', 'utf-8'));
  const planeData = JSON.parse(req.body.data);

  planeData.id = Date.now();
  planeData.images = req.files.map(file => `/uploads/${file.filename}`);

  planes.push(planeData);

  fs.writeFileSync('planes.json', JSON.stringify(planes, null, 2));
  res.status(201).json(planeData);
});

app.listen(5000, () => console.log('Server running on port 5000'));
