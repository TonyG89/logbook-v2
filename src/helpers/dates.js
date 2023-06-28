const day = 36 * Math.pow(10, 5) * 24
const month = day * 30
const year = day * 365
/**
* Вычисляет количество полных лет, месяцев и дней от заданного времени в миллисекундах.
*
* @param {number} time - Время в миллисекундах
* @return {Array<string>} Массив  [лет, месяцев, дней]
*/

const fullDate = (time) => {
  const fullYears = Math.floor(time / year)
  const fullMonths = Math.floor(time % year / month)
  const fullDays = Math.floor(time % month / day)
  const dataArr = []
  if (fullYears) dataArr.push(fullYears + 'г.')
  if (fullMonths) dataArr.push(fullMonths + 'мес.')
  if (fullDays) dataArr.push(fullDays + 'дн.')
  return dataArr
}

/**
 * 
 * @param {number} time Время в миллисекундах
 * @returns {number} количество полных дней
 */
const quantityDay = (time) => Math.floor(time / day)

export { fullDate, quantityDay }
