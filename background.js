const sounds = {
  'https://www.blaseball.com/api/chooseIdol': 'sounds/ahhhh.mp3',
  'https://www.blaseball.com/api/eatADangPeanut': 'sounds/peanut.wav'
};

function listener(details) {
  if (new URL(details.originUrl).host !== 'www.blaseball.com') return;

  if (sounds.hasOwnProperty(details.url)) {
    const audio = new Audio(sounds[details.url]);
    audio.play();
  } else {
    console.log(`unknown: ${details.url}`);
  }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(listener, {
  urls: Object.keys(sounds),
  types: ['xmlhttprequest']
});
