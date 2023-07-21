export const numberWithSpace = (str) => {
  const regExp = /\B(?=(\d{3})+(?!\d))/g
  let numberWithSpace
  let string = ''
  if (typeof str !== 'string') {
    string = String(str)
  } else {
    string = str
  }
  numberWithSpace = string.replace(regExp, " ")
  return string.length > 3 ? numberWithSpace : string
}