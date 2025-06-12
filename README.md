Air Trader Pro
Air Trader Pro is a web application designed to facilitate the buying and selling of airplanes. Built using modern web technologies, it offers a seamless platform for aviation enthusiasts and professionals to connect, trade, and stay informed through our integrated blog.

Features
Aircraft Listings: Browse and search for airplanes available for sale, complete with detailed specifications, images, and pricing information.
Sell Aircraft: Users can list their aircraft for sale by providing necessary details and images.
Blog: Stay updated with the latest news, articles, and insights related to aviation.
Contact Form: Reach out to us for inquiries, support, or feedback.
Technologies Used
Frontend:
React: A JavaScript library for building user interfaces.
React Router: Declarative routing for React applications.
Formik: Form management library for React.
Yup: JavaScript schema builder for value parsing and validation.
Backend:
Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.
Express: Web application framework for Node.js.
Firebase Admin SDK: Used to store data in Firestore.
Installation
To run this project locally, follow these steps:

Clone the repository and install dependencies:

```bash
git clone https://github.com/Sufuron/AirTraderPro.git
cd AirTraderPro
npm install
npm install firebase
cd server && npm install
cp .env.example .env # provide your Firebase service account JSON
cd ..
cp .env.example .env # add your Firebase web config for the frontend
# The sample file already includes the project ID (aviacion360-7a463)
# and messaging sender ID (972139427481). Fill in your API key,
# app ID and measurement ID.
```

Start the development servers in separate terminals:

```bash
# Backend API
cd server && npm start

# Frontend
cd .. && npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Guía en español

Si prefieres las instrucciones en español para configurar el backend y utilizar
la página administrativa, consulta el archivo
[`docs/backend_setup_es.md`](docs/backend_setup_es.md).

Usage
Browse Listings: Navigate to the "Inventory" section to view available aircraft.
List an Aircraft: Go to the "Sell Aircraft" page, fill out the form with your aircraft's details, and submit.
Read Blog Posts: Visit the "Blog" section for the latest articles.
Contact Us: Use the "Contact" form for any inquiries or feedback.

### API Endpoints

The backend exposes the following routes on `http://localhost:5000`:


- `GET /api/planes` – list planes
- `POST /api/planes` – create a plane (protected)
- `GET /api/planes/:id` – fetch a single plane
- `GET /api/blog` – list blog posts
- `POST /api/blog` – create a blog post (protected)
- `GET /api/blog/:id` – fetch a single blog post
Contributing
We welcome contributions from the community. To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.
Please ensure that your code adheres to our coding standards and includes appropriate tests.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact
For questions or support, please contact us at support@airtraderpro.com.