async function testRestTTS() {
  const url = 'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4';
  const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='te-IN'><voice name='te-IN-MohanNeural'><prosody pitch='+0Hz' rate='+0%'>నమస్కారం! నేను మోహన్.</prosody></voice></speak>`;

  try {
    console.log('Testing REST POST to Bing Speech...');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
      },
      body: ssml
    });
    console.log('Status:', res.status, res.statusText);
    const buf = await res.arrayBuffer();
    console.log('Buffer size:', buf.byteLength);
  } catch (e) {
    console.error('Error:', e);
  }
}

testRestTTS();
