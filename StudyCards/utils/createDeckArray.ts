export function createDeckArray(length: number): number[] {
  if (length % 1 !== 0 || length < 1) {
    throw new Error('Invalid length')
  }
  return [...Array(length).keys()]
}
