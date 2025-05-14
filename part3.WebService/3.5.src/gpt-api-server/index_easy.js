// curl http://localhost:3000/chat/hi 
// 위와 같이 입력하면 hi를 User Message로 호출함.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET 방식 테스트용 엔드포인트 (예: /chat/hi)
app.get('/chat/:message', async (req, res) => {
  try {
    const userMessage = req.params.message;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'OpenAI API 호출 실패' });
  }
});

// 기존 POST 엔드포인트 유지
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'OpenAI API 호출 실패' });
  }
});

app.listen(port, () => {
  console.log(`✅ GPT API 서버가 http://localhost:${port} 에서 실행 중`);
});
