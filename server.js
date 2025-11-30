
import OpenAI from 'openai';
import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/', (req, res) => {
    res.send('<h1>Добре дошли в Nik-Ai!</h1><p>API за чатбота е активно и готово да приема POST заявки на адрес /chat.</p>');
});

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an educational assistant answering only questions about communism neutrality." },
                { role: "user", content: userMessage }
            ],
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
