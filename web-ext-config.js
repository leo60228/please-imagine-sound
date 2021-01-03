module.exports = {
  run: {
    startUrl: ['www.blaseball.com'],
    firefoxProfile: `${__dirname}/.ff-profile/`,
    profileCreateIfMissing: true,
    keepProfileChanges: true
  }
};
