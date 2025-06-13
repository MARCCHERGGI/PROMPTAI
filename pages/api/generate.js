import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { model, goal, details } = req.body;
  const prompt = `End goal: ${goal}\nDetails: ${details}`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: `You're a prompt engineer for ${model}.` },
        { role: 'user', content: prompt },
      ],
    });

    res.status(200).json({ prompt: completion.data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ prompt: 'Failed to generate prompt.' });
  }
}
