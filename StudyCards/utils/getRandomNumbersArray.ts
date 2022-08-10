export function getRandomNumbersArray(
  length: number,
  max: number,
  correctIndex: number
): number[] {
  const array: number[] = [correctIndex]
  while (array.length < length) {
    const r = Math.floor(Math.random() * max)
    if (!array.includes(r)) {
      array.push(r)
    }
  }
  return array
}
