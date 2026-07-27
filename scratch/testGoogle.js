import googleTTS from 'google-tts-api';

async function testGoogleTTS() {
  try {
    console.log('Testing Google TTS API for Telugu...');
    const url = googleTTS.getAudioUrl('నమస్కారం! రేపటి మీ అపాయింట్‌మెంట్ నిర్ధారించడానికి AgenixAI నుండి కాల్ చేస్తున్నాను', {
      lang: 'te',
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });
    console.log('Generated Audio URL:', url);

    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    console.log(`🎉 SUCCESS! Fetched audio stream: ${arrayBuffer.byteLength} bytes`);
  } catch (err) {
    console.error('Google TTS Error:', err);
  }
}

testGoogleTTS();
