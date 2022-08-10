export const useDebounce = (callback, wait) => {
  let timer

  return function (event) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(event)
    }, wait)
  }
}
