import { WebSocket } from 'ws';
import crypto from 'crypto';

function getSecMsGec() {
  const ticks = Math.floor((Date.now() + 11644473600000) * 10000);
  const roundedTicks = ticks - (ticks % 3000000000); // 300 seconds
  const str = `${roundedTicks}6A5AA1D4EAFF4E9FB37E23D68491D6F4`;
  return crypto.createHash('sha256').update(str, 'ascii').digest('hex').toUpperCase();
}

async function testGEC() {
  const gec = getSecMsGec();
  const token = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
  const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${token}&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=1-130.0.0.0&ConnectionId=${crypto.randomUUID().replaceAll("-", "")}`;

  console.log('Testing GEC for token 6A5AA1D4EAFF4E9FB37E23D68491D6F4:', gec);

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
      }
    });
    ws.on('open', () => {
      console.log('🎉🎉🎉 GEC CONNECTED SUCCESSFULLY TO BING SPEECH!');
      ws.close();
      resolve(true);
    });
    ws.on('error', (err) => {
      console.log('❌ Error:', err.message);
      reject(err);
    });
  });
}

testGEC();
