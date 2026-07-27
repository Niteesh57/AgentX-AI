async function testVoicesList() {
  const url = 'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4';
  console.log('Fetching voices list from Microsoft...');
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
    }
  });
  const list = await res.json();
  console.log(`🎉 SUCCESS! Microsoft returned ${list.length} Neural voices!`);
  
  // Show all voices for Telugu, Hindi, Tamil, English US
  const te = list.filter(v => v.Locale === 'te-IN');
  const hi = list.filter(v => v.Locale === 'hi-IN');
  const en = list.filter(v => v.Locale === 'en-US');

  console.log('Telugu Neural Voices:', te.map(v => `${v.ShortName} (${v.Gender})`));
  console.log('Hindi Neural Voices:', hi.map(v => `${v.ShortName} (${v.Gender})`));
  console.log('English US Neural Voices:', en.map(v => `${v.ShortName} (${v.Gender})`));
}

testVoicesList();
