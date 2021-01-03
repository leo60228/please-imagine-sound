const simpleSounds = {
  'https://www.blaseball.com/api/chooseIdol': 'sounds/ahhhh.mp3',
  'https://www.blaseball.com/api/eatADangPeanut': 'sounds/peanut.wav'
};

function simpleSoundsListener(details) {
  if (new URL(details.originUrl).host !== 'www.blaseball.com') return;

  if (simpleSounds.hasOwnProperty(details.url)) {
    const audio = new Audio(simpleSounds[details.url]);
    audio.play();
  } else {
    console.log(`unknown: ${details.url}`);
  }

  return {};
}

function streamDataListener(details) {
  if (new URL(details.originUrl).host !== 'www.blaseball.com') return;

  const filter = browser.webRequest.filterResponseData(details.requestId);
  const decoder = new TextDecoder("utf-8");

  let buf = '';

  filter.ondata = event => {
    filter.write(event.data);

    const str = decoder.decode(event.data, {stream: true});
    buf += str;
    const [line, rest] = buf.split('\n');

    if (typeof rest === 'undefined') return;

    buf = rest;

    if (!line.startsWith('data: ')) return;

    const json = line.replace(/^data: /, '');

    const data = JSON.parse(json);
    console.log(data);
  };

  return {};
}

browser.webRequest.onBeforeRequest.addListener(simpleSoundsListener, {
  urls: Object.keys(simpleSounds),
  types: ['xmlhttprequest']
});

browser.webRequest.onBeforeRequest.addListener(streamDataListener, {
  urls: ['https://www.blaseball.com/events/streamData'],
  types: ['xmlhttprequest']
}, ['blocking']);
