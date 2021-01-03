function listener(details) {
  if (new URL(details.originUrl).host !== 'www.blaseball.com') return;

  console.log('events');

  return {};
}

browser.webRequest.onBeforeRequest.addListener(listener, {
  urls: ["https://www.blaseball.com/database/eventResults?*"],
  types: ["xmlhttprequest"]
});
