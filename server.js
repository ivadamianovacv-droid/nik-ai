
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/ask", async (req, res) => {
    const question = req.body.question;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Ти си чатбот, който отговаря само на въпроси за комунизма. Отговаряй ясно, точно и кратко." },
                    { role: "user", content: question }
                ]
            })
        });

        const data = await response.json();
        res.json({ answer: data.choices[0].message.content });

    } catch (error) {
        res.json({ answer: "Грешка при обработка на заявката." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
