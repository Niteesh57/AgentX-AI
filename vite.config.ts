import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import googleTTS from 'google-tts-api'

/**
 * Universal Native Neural TTS Synthesizer for Vite Dev Server Middleware
 */
async function synthesizeTTSBuffer(voiceName: string, text: string, rate = '+0%'): Promise<Buffer> {
  const langPrefix = voiceName.split('-')[0].toLowerCase();
  const isSlow = rate.includes('-');

  console.log(`[Vite TTS] Synthesizing ${voiceName} (${langPrefix}): "${text.substring(0, 30)}..."`);

  const url = googleTTS.getAudioUrl(text, {
    lang: langPrefix,
    slow: isSlow,
    host: 'https://translate.google.com',
  });

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    }
  });

  if (!response.ok) {
    throw new Error(`TTS fetch returned HTTP ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Vite plugin for TTS API middleware
function ttsApiPlugin() {
  return {
    name: 'tts-api-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/tts' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const { voiceName = 'te-IN-ShrutiNeural', text, rate = '+0%' } = JSON.parse(body || '{}');
              if (!text) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'text is required' }));
                return;
              }

              const mp3Buffer = await synthesizeTTSBuffer(voiceName, text, rate);

              res.setHeader('Content-Type', 'audio/mpeg');
              res.setHeader('Content-Length', mp3Buffer.length.toString());
              res.setHeader('Cache-Control', 'public, max-age=86400');
              res.end(mp3Buffer);
            } catch (err: any) {
              console.error('[Vite TTS Error]:', err?.message);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to synthesize TTS audio', details: err?.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ttsApiPlugin()],
})
