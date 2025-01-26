export interface Quote {
  text: string
  author: string
}

export enum TripsOrder {
  ALPHA_ASC = 'alphaAsc',
  ALPHA_DESC = 'alphaDesc',
  DATE_ASC = 'dateAsc',
  DATE_DESC = 'dateDesc'
}
