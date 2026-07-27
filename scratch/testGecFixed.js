import { WebSocket } from 'ws';
import crypto from 'crypto';
import fs from 'fs';

function getSecMsGec() {
  // Windows Ticks since 1601-01-01
  const ticks = Math.floor((Date.now() + 11644473600000) * 10000);
  const roundedTicks = ticks - (ticks % 3000000000); // round to 300s
  const str = `${roundedTicks}6A5AA1D4EA5E40C08167098869151522`;
  return crypto.createHash('sha256').update(str, 'ascii').digest('hex').toUpperCase();
}

function ttsEdgeGEC(text, voiceName, rate = "+0%", pitch = "+0Hz") {
  const gec = getSecMsGec();
  const connectionId = crypto.randomUUID().replaceAll("-", "");
  const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EA5E40C08167098869151522&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=1-130.0.0.0&ConnectionId=${connectionId}`;

  console.log('Connecting to Edge TTS with GEC:', gec);

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

    const audioData = [];

    ws.on("message", (rawData, isBinary) => {
      if (!isBinary) {
        const str = rawData.toString("utf8");
        if (str.includes("turn.end")) {
          resolve(Buffer.concat(audioData));
          ws.close();
        }
        return;
      }
      const separator = "Path:audio\r\n";
      const index = rawData.indexOf(separator);
      if (index !== -1) {
        const content = rawData.subarray(index + separator.length);
        audioData.push(content);
      }
    });

    ws.on("error", reject);

    const speechConfig = JSON.stringify({
      context: {
        synthesis: {
          audio: {
            metadataoptions: { sentenceBoundaryEnabled: false, wordBoundaryEnabled: false },
            outputFormat: "audio-24khz-48kbitrate-mono-mp3"
          }
        }
      }
    });

    const timestamp = new Date().toUTCString();
    const configMessage = `X-Timestamp:${timestamp}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n${speechConfig}`;

    ws.on("open", () => ws.send(configMessage, { compress: true }, (configErr) => {
      if (configErr) return reject(configErr);

      const lang = voiceName.split('-').slice(0, 2).join('-');
      const ssmlMessage = `X-RequestId:${crypto.randomUUID().replaceAll("-", "")}\r\n` +
        `Content-Type:application/ssml+xml\r\n` +
        `X-Timestamp:${timestamp}\r\nPath:ssml\r\n\r\n` +
        `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${lang}'>` +
        `<voice name='${voiceName}'><prosody pitch='${pitch}' rate='${rate}'>` +
        `${text}</prosody></voice></speak>`;

      ws.send(ssmlMessage, { compress: true }, (ssmlErr) => {
        if (ssmlErr) reject(ssmlErr);
      });
    }));
  });
}

async function test() {
  try {
    console.log('Synthesizing Mohan Telugu Male Voice via GEC Edge-TTS...');
    const buf = await ttsEdgeGEC('నమస్కారం! నేను మోహన్, మీ తెలుగు వాయిస్ ఏజెంట్‌ని.', 'te-IN-MohanNeural');
    fs.writeFileSync('scratch/mohan_telugu.mp3', buf);
    console.log(`🎉🎉🎉 SUCCESS! REAL MICROSOFT MOHAN MALE VOICE SYNTHESIZED! Size: ${buf.length} bytes`);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
