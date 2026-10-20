const express = require('express');   // 1. load the Express framework module

const app = express();                // 2. instantiate the server application
const PORT = 3000;

app.use(express.json());   // parses incoming JSON bodies and populates req.body

// 3. route definition: executed when a client requests GET /
app.get('/', (req, res) => {
  res.json({ message: "Hello, I am the blog API" });
});

// ---------------------------------------------------------------------------
// Step 3: the article collection
// ---------------------------------------------------------------------------

// In-memory data store. State resets to defaults upon process restart.
// Persistent storage will be handled by MongoDB in Session 3.
const articles = [
  { id: 1, title: 'Welcome to the blog', author: 'Admin' },
  { id: 2, title: 'My first Express server', author: 'Aya' },
  { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];

let nextId = 4;   // next auto-incremented id (ids 1, 2, and 3 are already assigned)

// GET /api/articles              -> all articles
// GET /api/articles?author=Aya   -> articles filtered by author
app.get('/api/articles', (req, res) => {
  const { author } = req.query;   // equivalent to: const author = req.query.author;

  let result = articles;
  if (author) {                   // if query parameter ?author= was provided
    result = articles.filter(a => a.author === author);
  }
  res.json({ total: result.length, articles: result });
});

// GET /api/articles/2 -> fetch article whose id equals 2
app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);          // convert "2" (string) -> 2 (number)
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} not found` });
  }
  res.json(article);
});

// POST /api/articles -> creates an article from { "title": "...", "author": "..." }
app.post('/api/articles', (req, res) => {
  const { title, author } = req.body;   // destructuring (Step 5)

  if (!title || !author) {   // validation: both fields are strictly required
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newArticle = { id: nextId, title: title, author: author };
  nextId = nextId + 1;
  articles.push(newArticle);

  res.status(201).json({ message: 'Article created', article: newArticle });
});

// ---------------------------------------------------------------------------
// Exercise 1: Extend the API
// ---------------------------------------------------------------------------

// 1. GET /about -> application name, student name and release version
app.get('/about', (req, res) => {
  res.json({
    application: 'Blog API',
    student: 'Amir Kerkeni',
    version: '1.0.0'
  });
});

const users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' },
  { id: 2, name: 'Omar', email: 'omar@example.com' },
  { id: 3, name: 'Alex', email: 'alex@example.com' }
];

// 2. GET /api/users              -> all users
// 5. GET /api/users?name=Aya     -> users filtered by name (bonus)
app.get('/api/users', (req, res) => {
  const { name } = req.query;

  let result = users;
  if (name) {
    result = users.filter(u => u.name === name);
  }
  res.json({ total: result.length, users: result });
});

// 3. GET /api/users/:id -> the matching user, or 404 if absent
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: `User ${id} not found` });
  }
  res.json(user);
});

// 4. POST /contact -> accepts { "email": "...", "message": "..." }
app.post('/contact', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  res.status(200).json({ message: "Thank you, your message has been received" });
});

// 4. bind and listen: await incoming HTTP requests on port 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
