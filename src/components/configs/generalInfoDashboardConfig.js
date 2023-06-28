import {
  fullDate
} from '@/helpers/dates.js'

export default function (data) {

  const newItem = data.value[0]
  const oldItem = data.value.at(-1)
  const myTotalOwnDays = new Date(newItem.date) - new Date(oldItem.date)
  // DATE
  const fromBoughtToToday = new Date() - new Date(oldItem.date)
  const countDaysFromLastAction = new Date() - new Date(newItem.date)
  const dataThisYear = data.value?.filter(({ date }) => date.includes('2023'))
  const dataLastYear = data.value?.filter(({ date }) => date.includes('2022'))
  const lastDateKilometers = dataThisYear.at(-1).kilometers || (dataThisYear.at(-2).kilometers + data.value[dataThisYear.length + 1].kilometers) / 2
  const quantityDays = oldItem.date
  const myTotalDistance = newItem.kilometers - oldItem.kilometers

  const getAmount = (work, filteredValue = '') => {
    let amount
    if (!filteredValue) amount = data.value?.reduce((sum, item) => sum + +item[work], 0)
    else {
      const filteredObj = data.value.filter(obj => obj.status === filteredValue)
      amount = filteredObj?.reduce((sum, item) => sum + +item[work], 0)
    }
    return amount
  }

  return [{
    title: 'Срок службы:',
    value: fullDate(fromBoughtToToday),
  },
  {
    title: 'Последние манипуляции:',
    value: fullDate(countDaysFromLastAction).join(' ') || 'сегодня',
  },
  {
    title: 'Наездил:',
    value: myTotalDistance + ' км',
  },
  {
    title: 'Потратил:',
    value: getAmount('details') + getAmount('work') + ' грн',
    hint: `детали: ${getAmount('details')} грн; работа: ${getAmount('work')} грн`,
  },
  {
    title: 'Cтоимость километра:',
    value: ((getAmount('details') + getAmount('work'))/myTotalDistance).toFixed(2) + ' грн/км',
    hint: 'это стоимость без расхода топлива'
  },
  {
    title: 'действий:',
    value: data.value.length + ' шт.',
  },
  {
    title: 'Ближайший ремонт:',
    value: 'пока нема',
  },
  ]
}