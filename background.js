const fixedSounds = {
  '/api/chooseIdol': sound('ahhhh.mp3'),
  '/api/eatADangPeanut': sound('peanut.wav'),
  //'/api/buyUpdateFavoriteTeam': sound('flute.mp3'),
};

const userActions = [
  '/api/bet',
  '/api/buyADangPeanut',
  '/api/buyADangSquirrel',
  '/api/buySnack',
  '/api/buyUnlockElection',
  '/api/buyUnlockShop',
  '/api/buyUpdateFavoriteTeam',
  '/api/buyVote',
  '/api/chooseIdol',
  '/api/eatADangPeanut',
  '/api/logBeg',
  '/api/payTribute',
  '/api/updateFavoriteTeam',
  '/api/updateSettings',
  '/api/vote',
];

const foghornChance = 1 / 100;

function play(sound) {
  const audio = new Audio(`sounds/${sound}`);
  audio.play();
}

function sound(sound) {
  return () => play(sound);
}

function requestListener(details) {
  if (details.hasOwnProperty('originUrl')) {
    if (new URL(details.originUrl).host !== 'www.blaseball.com') return;
  } else if (details.hasOwnProperty('initiator')) {
    if (details.initiator !== 'https://www.blaseball.com') return;
  }

  const url = new URL(details.url);
  const path = url.pathname;

  console.groupCollapsed(path);

  try {
    if (userActions.includes(path) && Math.random() < foghornChance) {
      console.log('[FOGHORN SOUND]');
      play('foghorn.mp3');
    } else if (fixedSounds.hasOwnProperty(path)) {
      console.log('fixed sound');
      fixedSounds[path]();
    } else {
      console.log('ignoring');
    }
  } finally {
    console.groupEnd();
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

browser.webRequest.onBeforeRequest.addListener(requestListener, {
  urls: ['https://www.blaseball.com/api/*'],
  types: ['xmlhttprequest']
});

//browser.webRequest.onBeforeRequest.addListener(streamDataListener, {
//  urls: ['https://www.blaseball.com/events/streamData'],
//  types: ['xmlhttprequest']
//}, ['blocking']);
