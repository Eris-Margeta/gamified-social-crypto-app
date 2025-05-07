import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet'; 

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet()); 

const PORT = process.env.PORT || 5173;
const HTTPS_PORT = 443; 


const buildPath = path.join(__dirname, '..', 'dist');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});


if (process.env.NODE_ENV === 'production') {

  const certOptions = {
    key: fs.readFileSync(path.resolve(__dirname, 'certificates', 'origin.key')), 
    cert: fs.readFileSync(path.resolve(__dirname, 'certificates', 'origin.pem')), 
  };

  https.createServer(certOptions, app).listen(HTTPS_PORT, () => {
    console.log(`Server is running on https://localhost:${HTTPS_PORT}`);
  });
} else {

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
