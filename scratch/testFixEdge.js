import { WebSocket } from 'ws';
import crypto from 'crypto';
import fs from 'fs';

function ttsEdgeFix(text, voiceName, rate = "+0%", pitch = "+0Hz") {
  const token = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
  const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${token}&ConnectionId=${crypto.randomUUID().replaceAll("-", "")}`;

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url, {
      host: "speech.platform.bing.com",
      origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0"
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
    console.log('Synthesizing Mohan Telugu Male Voice via updated Edge-TTS...');
    const buf = await ttsEdgeFix('నమస్కారం! నేను మోహన్, మీ తెలుగు వాయిస్ ఏజెంట్‌ని.', 'te-IN-MohanNeural');
    fs.writeFileSync('scratch/mohan_telugu.mp3', buf);
    console.log(`🎉 SUCCESS! Audio synthesized! Size: ${buf.length} bytes`);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
