import express from 'express';
import cors from 'cors';
import googleTTS from 'google-tts-api';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/**
 * Universal Native Neural TTS Audio Synthesizer Server
 * Synthesizes pristine native audio streams for ALL languages (Telugu, Tamil, Malayalam, Kannada, Hindi, etc.)
 */
async function synthesizeTTSBuffer(voiceName, text, rate = '+0%', pitch = '+0Hz') {
  // Extract language prefix e.g. 'te-IN-ShrutiNeural' -> 'te'
  const langPrefix = voiceName.split('-')[0].toLowerCase();
  const isSlow = rate.includes('-');

  console.log(`[TTS Server] Synthesizing ${voiceName} (${langPrefix}): "${text.substring(0, 30)}..."`);

  const url = googleTTS.getAudioUrl(text, {
    lang: langPrefix,
    slow: isSlow,
    host: 'https://translate.google.com',
    timeout: 10000,
  });

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    }
  });

  if (!response.ok) {
    throw new Error(`TTS server fetch returned HTTP ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Endpoint: POST /api/tts
app.post('/api/tts', async (req, res) => {
  try {
    const { voiceName = 'te-IN-ShrutiNeural', text, rate = '+0%', pitch = '+0Hz' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    const mp3Buffer = await synthesizeTTSBuffer(voiceName, text, rate, pitch);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': mp3Buffer.length,
      'Cache-Control': 'public, max-age=86400',
    });

    res.send(mp3Buffer);
  } catch (err) {
    console.error('[TTS Server Error]:', err.message);
    res.status(500).json({ error: 'Failed to synthesize TTS audio', details: err.message });
  }
});

// Endpoint: GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AgenixAI Universal Native Voice Server' });
});

app.listen(PORT, () => {
  console.log(`🚀 AgenixAI Universal Voice Server running at http://localhost:${PORT}`);
});
