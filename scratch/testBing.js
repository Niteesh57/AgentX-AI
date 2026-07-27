import { WebSocket } from 'ws';
import crypto from 'crypto';

async function testTokens() {
  const tokens = [
    '6A5AA1D4EAFF4E9FB37E23D68491D6F4',
    '6A5AA1D4EA5E40C08167098869151522',
    '5A5AA1D4EA5E40C08167098869151522'
  ];

  for (const t of tokens) {
    const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${t}&ConnectionId=${crypto.randomUUID().replaceAll("-", "")}`;
    console.log('Testing token:', t);
    try {
      await new Promise((resolve, reject) => {
        const ws = new WebSocket(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
            'Origin': 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold'
          }
        });
        ws.on('open', () => {
          console.log(`✅ Token ${t} CONNECTED SUCCESSFULLY!`);
          ws.close();
          resolve(true);
        });
        ws.on('error', (err) => {
          console.log(`❌ Token ${t} Error: ${err.message}`);
          reject(err);
        });
      });
    } catch (e) {}
  }
}

testTokens();
