export const Platform = Object.freeze({
  BROWSER: 1,
  DOWNLOAD: 2
})

export const games = [
  {
    name: 'Zombie Runner',
    type: 'FPS',
    thumbnail: 'https://stuff.p-kin.com/pf-thumbs/games/zombierunner.jpg',
    platform: Platform.DOWNLOAD,
    size: '90M',
    link: 'https://games.p-kin.com/zombierunner.zip'
  },
  {
    name: 'Realm Rush',
    type: 'Tower Defense',
    thumbnail: 'https://stuff.p-kin.com/pf-thumbs/games/realmrush.jpg',
    platform: Platform.BROWSER,
    size: '11M',
    link: 'https://games.p-kin.com/realmrush'
  },
  {
    name: 'Argon Assault',
    type: 'Rails Shooter',
    thumbnail: 'https://stuff.p-kin.com/pf-thumbs/games/argonassault.jpg',
    platform: Platform.DOWNLOAD,
    size: '56M',
    link: 'https://games.p-kin.com/argonassault.zip',
    linuxLink: 'https://games.p-kin.com/argon-assault-linux.zip',
    linuxSize: '88M'
  },
  {
    name: 'Project Boost',
    type: 'Just fly the rocket from A to B :)',
    thumbnail: 'https://stuff.p-kin.com/pf-thumbs/games/projectboost.jpg',
    platform: Platform.BROWSER,
    size: '5M',
    link: 'https://games.p-kin.com/projectboost'
  }
]
