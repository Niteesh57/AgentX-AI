import { getVoices } from 'edge-tts/out/index.js';

async function listAllVoices() {
  try {
    console.log('Fetching Microsoft Edge TTS voice list from Microsoft...');
    const voices = await getVoices();
    console.log(`🎉 Total Microsoft Neural Voices fetched: ${voices.length}`);

    // Filter by Indian languages + top global languages
    const indianVoices = voices.filter(v => v.Locale.endsWith('-IN'));
    console.log('\n--- Indian Voices ---');
    indianVoices.forEach(v => {
      console.log(`${v.Locale} | ${v.ShortName} | Gender: ${v.Gender} | FriendlyName: ${v.FriendlyName}`);
    });

    console.log('\n--- Sample English US Voices ---');
    voices.filter(v => v.Locale === 'en-US').forEach(v => {
      console.log(`${v.ShortName} | ${v.Gender}`);
    });

  } catch (err) {
    console.error('Error fetching voice list:', err);
  }
}

listAllVoices();
