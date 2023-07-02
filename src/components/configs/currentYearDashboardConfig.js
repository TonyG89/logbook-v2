import {
  fullDate, quantityDay
} from '@/helpers/dates.js'
import moment from 'moment'
export default function (data) {
  const newItem = data.value[0]
  const oldItem = data.value.at(-1)
  const myTotalOwnDays = new Date(newItem.date) - new Date(oldItem.date)


  /**
   * @title Фильтрация по году
   * @param {number} год, по которому будет осуществляться фильтрация
   * @return {Array} отфильтрованные данные
   */
  const getDataYear = (year) => {
    return data.value?.filter(({ date }) => date.includes(year))
  }
  /**
   * Рассчитывает годовое расстояние, пройденное транспортным средством в зависимости от года.
   *
   * @param {number} Год, для которого рассчитывается расстояние.
   * @return {number} Возвращает расстояние, пройденное в километрах в течение года.
   */
  // 
  const currentYear = moment().year()
  const annualDistance = (year) => getDataYear(year)[0].kilometers - getDataYear(year).at(-1).kilometers
  const daysOnThisYear = (new Date(getDataYear(currentYear)[0].date) - new Date(getDataYear(currentYear).at(-1).date)) / 86400000
  console.log(new Date(getDataYear(currentYear)[0].date))
  const myTotalDistance = newItem.kilometers - oldItem.kilometers
  const totalDays = quantityDay(myTotalOwnDays)


  const infoDashboard = [{
    title: 'Пробег:',
    value: (annualDistance(currentYear) / parseInt(daysOnThisYear)).toFixed(1) + ' км/день',
    type: 'distance'
  },
  {
    title: '-за месяц:',
    value: newItem.kilometers + ' км' + 'за текущий год',
    type: 'distance'
  },
  {
    title: '-за день:',
    value: newItem.kilometers + ' км' + 'за текущий год',
    type: 'distance'
  },
  {
    title: 'Потрачено:',
    value: myTotalDistance + ' грн' + 'за текущий год',
    type: 'wasted'
  },
  {
    title: '-за месяц:',
    value: newItem.kilometers + ' грн' + 'за текущий год',
    type: 'wasted'
  },
  {
    title: '-за день:',
    value: newItem.kilometers + ' грн' + 'за текущий год',
    type: 'wasted'
  },
  {
    title: 'поломка:',
    value: annualDistance(currentYear),
    type: 'category' + ' грн'
  },
  {
    title: 'расходка:',
    value: annualDistance(currentYear),
    type: 'category' + ' грн'
  },
  {
    title: 'Что делал(категория):',
    value: annualDistance(currentYear),
    type: 'tags'
  },
  {
    title: 'Текущий год:', // весь километраж с первой записи по последнею / количество дней/365
    value: (annualDistance(currentYear) / parseInt(daysOnThisYear)).toFixed(1) + ' км/день',
  },
  ]
  return infoDashboard
}