import {
  fullDate, quantityDay
} from '@/helpers/dates.js'
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
  const annualDistance = (year) => getDataYear(year)[0].kilometers - getDataYear(year).at(-1).kilometers
  const daysOnThisYear = (new Date(getDataYear(2023)[0].date) - new Date(getDataYear(2023).at(-1).date)) / 86400000
  console.log(new Date(getDataYear(2023)[0].date))
  const myTotalDistance = newItem.kilometers - oldItem.kilometers
  const totalDays = quantityDay(myTotalOwnDays)

  const infoDashboard = [{
    title: 'Пробег:',
    value: newItem.kilometers + ' км',
  },
  {
    title: 'Наездил:',
    value: myTotalDistance + ' км',
  },
  // {
  //   title: '2019 год:',
  //   value: annualDistance(2019) + ' км',
  // },
  // {
  //   title: '2020: год',
  //   value: annualDistance(2020) + ' км',
  // },
  // {
  //   title: '2021 год:',
  //   value: annualDistance(2021) + ' км',
  // },
  // {
  //   title: 'Прошлый год:',
  //   value: annualDistance(2022) + ' км',
  // },
  {
    title: 'За текущий год:',
    value: annualDistance(2023) + ' км',
  },
  {
    title: 'в день(за всё время):',
    value: (myTotalDistance / totalDays).toFixed(1) + ' км',
  },
  {
    title: 'в день(за этот год):', // весь километраж с первой записи по последнею / количество дней/365
    value: (annualDistance(2023) / parseInt(daysOnThisYear)).toFixed(1) + ' км',
  },
  ]
  return infoDashboard
}