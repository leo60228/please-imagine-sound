const simpleSounds = {
  'https://www.blaseball.com/api/chooseIdol': 'sounds/ahhhh.mp3',
  'https://www.blaseball.com/api/eatADangPeanut': 'sounds/peanut.wav',
  //'https://www.blaseball.com/api/buyUpdateFavoriteTeam': 'sounds/flute.mp3',
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

//function streamDataListener(details) {
//  if (new URL(details.originUrl).host !== 'www.blaseball.com') return;
//
//  const filter = browser.webRequest.filterResponseData(details.requestId);
//  const decoder = new TextDecoder("utf-8");
//
//  let buf = '';
//
//  filter.ondata = event => {
//    filter.write(event.data);
//
//    const str = decoder.decode(event.data, {stream: true});
//    buf += str;
//    const [line, rest] = buf.split('\n');
//
//    if (typeof rest === 'undefined') return;
//
//    buf = rest;
//
//    if (!line.startsWith('data: ')) return;
//
//    const json = line.replace(/^data: /, '');
//
//    const data = JSON.parse(json);
//    console.log(data);
//  };
//
//  return {};
//}

function foghornSoundListener(details) {
  if (new URL(details.originUrl).host !== 'www.blaseball.com') return;

  if (Math.random() < 0.01) {
    const audio = new Audio('sounds/foghorn.mp3');
    audio.play();
  }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(simpleSoundsListener, {
  urls: Object.keys(simpleSounds),
  types: ['xmlhttprequest']
});

//browser.webRequest.onBeforeRequest.addListener(streamDataListener, {
//  urls: ['https://www.blaseball.com/events/streamData'],
//  types: ['xmlhttprequest']
//}, ['blocking']);

browser.webRequest.onBeforeRequest.addListener(foghornSoundListener, {
  urls: [
    'https://www.blaseball.com/api/bet',
    'https://www.blaseball.com/api/bet?*',
    'https://www.blaseball.com/api/buyADangPeanut',
    'https://www.blaseball.com/api/buyADangPeanut?*',
    'https://www.blaseball.com/api/buyADangSquirrel',
    'https://www.blaseball.com/api/buyADangSquirrel?*',
    'https://www.blaseball.com/api/buySnack',
    'https://www.blaseball.com/api/buySnack?*',
    'https://www.blaseball.com/api/buyUnlockElection',
    'https://www.blaseball.com/api/buyUnlockElection?*',
    'https://www.blaseball.com/api/buyUnlockShop',
    'https://www.blaseball.com/api/buyUnlockShop?*',
    'https://www.blaseball.com/api/buyUpdateFavoriteTeam',
    'https://www.blaseball.com/api/buyUpdateFavoriteTeam?*',
    'https://www.blaseball.com/api/buyVote',
    'https://www.blaseball.com/api/buyVote?*',
    'https://www.blaseball.com/api/chooseIdol',
    'https://www.blaseball.com/api/chooseIdol?*',
    'https://www.blaseball.com/api/eatADangPeanut',
    'https://www.blaseball.com/api/eatADangPeanut?*',
    'https://www.blaseball.com/api/logBeg',
    'https://www.blaseball.com/api/logBeg?*',
    'https://www.blaseball.com/api/payTribute',
    'https://www.blaseball.com/api/payTribute?*',
    'https://www.blaseball.com/api/updateFavoriteTeam',
    'https://www.blaseball.com/api/updateFavoriteTeam?*',
    'https://www.blaseball.com/api/updateSettings',
    'https://www.blaseball.com/api/updateSettings?*',
    'https://www.blaseball.com/api/vote',
    'https://www.blaseball.com/api/vote?*',
  ],
  types: ['xmlhttprequest']
});
