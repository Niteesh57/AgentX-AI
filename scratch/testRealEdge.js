import { tts } from 'edge-tts/out/index.js';
import fs from 'fs';

async function testRealEdgeTTS() {
  try {
    console.log('Synthesizing Telugu MALE voice te-IN-MohanNeural via edge-tts...');
    const mp3Buffer = await tts('నమస్కారం! నేను మోహన్, మీ వాయిస్ ఏజెంట్‌ని.', {
      voice: 'te-IN-MohanNeural',
      rate: '+0%',
      pitch: '+0Hz',
    });

    fs.writeFileSync('scratch/mohan_telugu.mp3', mp3Buffer);
    console.log(`🎉 SUCCESS! Mohan Male voice MP3 saved! Size: ${mp3Buffer.length} bytes`);

    console.log('Synthesizing Hindi MALE voice hi-IN-MadhurNeural via edge-tts...');
    const hindiBuffer = await tts('नमस्ते! मैं मधुर हूँ, आपका वॉयस एजेंट।', {
      voice: 'hi-IN-MadhurNeural',
      rate: '+0%',
      pitch: '+0Hz',
    });

    fs.writeFileSync('scratch/madhur_hindi.mp3', hindiBuffer);
    console.log(`🎉 SUCCESS! Madhur Male voice MP3 saved! Size: ${hindiBuffer.length} bytes`);

  } catch (err) {
    console.error('Edge-TTS Error:', err);
  }
}

testRealEdgeTTS();
