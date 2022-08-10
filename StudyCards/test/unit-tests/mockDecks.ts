import { DeckResource } from '~/services/deck/types/DeckResource'

export const mockDecks: DeckResource[] = [
  {
    id: 'd1',
    name: 'test1',
    link: '',
    progress: JSON.stringify({
      remaining: [1, 2, 3, 4, 5, 6],
      done: [7, 8, 9, 10],
      difficult: [11, 12],
      lastUsed: new Date('2020.01.04.').toISOString(),
      shuffled: false,
    }),
    userId: '',
  },
  {
    id: 'd2',
    name: 'test2',
    link: '',
    progress: JSON.stringify({
      remaining: [4, 5, 6],
      done: [1, 2, 3],
      difficult: [],
      lastUsed: new Date('2020.02.04.').toISOString(),
      shuffled: false,
    }),
    userId: '',
  },
  {
    id: 'd3',
    name: 'test3 completed',
    link: '',
    progress: JSON.stringify({
      remaining: [],
      done: [3, 4, 1, 2, 5],
      difficult: [],
      lastUsed: new Date('2020.01.12.').toISOString(),
      shuffled: false,
    }),
    userId: '',
  },
  {
    id: 'd4',
    name: 'test4',
    link: '',
    progress: JSON.stringify({
      remaining: [1, 2, 3],
      done: [],
      difficult: [],
      lastUsed: new Date('2020.05.21.').toISOString(),
      shuffled: false,
    }),
    userId: '',
  },
  {
    id: 'd5',
    name: 'test5 completed',
    link: '',
    progress: JSON.stringify({
      remaining: [],
      done: [1, 2, 3, 5, 6, 4],
      difficult: [],
      lastUsed: new Date('2020.03.10.').toISOString(),
      shuffled: false,
    }),
    userId: '',
  },
]
