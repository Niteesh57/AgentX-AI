import { WebSocket } from 'ws';

function tts(text, options = {}) {
  const { voice = "te-IN-ShrutiNeural", volume = "+0%", rate = "+0%", pitch = "+0Hz" } = options;
  const token = "6A5AA1D4EA5E40C08167098869151522";
  const webSocketURL = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${token}&ConnectionId=${crypto.randomUUID().replaceAll("-", "")}`;

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(webSocketURL, {
      host: "speech.platform.bing.com",
      origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
      headers: { 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0" 
      }
    });

    const audioData = [];

    ws.on("message", (rawData, isBinary) => {
      if (!isBinary) {
        const data2 = rawData.toString("utf8");
        if (data2.includes("turn.end")) {
          resolve(Buffer.concat(audioData));
          ws.close();
        }
        return;
      }
      const data = rawData;
      const separator = "Path:audio\r\n";
      const contentIndex = data.indexOf(separator);
      if (contentIndex !== -1) {
        const content = data.subarray(contentIndex + separator.length);
        audioData.push(content);
      }
    });

    ws.on("error", reject);

    const speechConfig = JSON.stringify({ context: { synthesis: { audio: {
      metadataoptions: { sentenceBoundaryEnabled: false, wordBoundaryEnabled: false },
      outputFormat: "audio-24khz-48kbitrate-mono-mp3"
    } } } });

    const configMessage = `X-Timestamp:${new Date().toISOString()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n${speechConfig}`;

    ws.on("open", () => ws.send(configMessage, { compress: true }, (configError) => {
      if (configError) return reject(configError);

      const lang = voice.split('-').slice(0, 2).join('-');
      const ssmlMessage = `X-RequestId:${crypto.randomUUID().replaceAll("-", "")}\r\n` +
        `Content-Type:application/ssml+xml\r\n` +
        `X-Timestamp:${new Date().toISOString()}\r\nPath:ssml\r\n\r\n` +
        `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${lang}'>` +
        `<voice name='${voice}'><prosody pitch='${pitch}' rate='${rate}' volume='${volume}'>` +
        `${text}</prosody></voice></speak>`;

      ws.send(ssmlMessage, { compress: true }, (ssmlError) => {
        if (ssmlError) reject(ssmlError);
      });
    }));
  });
}

async function run() {
  try {
    console.log('Testing Edge TTS token synthesize...');
    const buffer = await tts('నమస్కారం! ఎలా ఉన్నారు?');
    console.log(`🎉 SUCCESS! Audio generated: ${buffer.length} bytes`);
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
