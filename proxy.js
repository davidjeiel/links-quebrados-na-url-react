import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(cors()); // Habilita o CORS

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url, { maxRedirects: 1 }, { headers: { 'User-Agent': 'Mozilla/5.0' }}, { timeout: 10000 } ); // Limita a quantidade de redirecionamentos para 1
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`Erro ao obter os dados da URL: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Servidor proxy está ativo. Porta: ${port}`);
});
