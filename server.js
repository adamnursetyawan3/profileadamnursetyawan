import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Fallback to index.html for page routes (exclude requests with file extensions)
app.get('*', (req, res) => {
  if (path.extname(req.path)) {
    return res.status(404).send('File not found');
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
