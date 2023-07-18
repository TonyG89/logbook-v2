import {
  fullDate
} from '@/helpers/dates.js'

export default function (data) {
  const thisYear = new Date().getFullYear()
  const newItem = data.value[0]
  const oldItem = data.value.at(-1)
  const myTotalOwnDays = new Date(newItem.date) - new Date(oldItem.date)
  // DATE
  const fromBoughtToToday = new Date() - new Date(oldItem.date)
  const countDaysFromLastAction = new Date() - new Date(newItem.date)
  const dataThisYear = data.value?.filter(({ date }) => date.includes(thisYear))
  const dataLastYear = data.value?.filter(({ date }) => date.includes(thisYear - 1))
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

  return [
    {
      title: 'Year of creation',
      value: 2008,
      type: 'main',
    },
    {
      title: 'Term of use',
      value: fullDate(fromBoughtToToday),
      type: 'main',
    },
    {
      title: 'Drow',
      value: myTotalDistance + ' км',
      type: 'wasted',
    },
    {
      title: 'Spent',
      value: getAmount('details') + getAmount('work') + ' грн',
      hint: `детали: ${getAmount('details')} грн; работа: ${getAmount('work')} грн`,
      type: 'wasted',
    },
    {
      title: 'Operations',
      value: data.value.length + ' шт.',
      type: 'wasted',
    },
    {
      title: 'How long was a last operation',
      value: [fullDate(countDaysFromLastAction).join(' ') || 'сегодня'],
      hint: 'скільки днів тому та що робив',
      type: 'repair',
    },
    {
      title: 'Last repair',
      value: newItem.actions,
      type: 'repair',
    },
    {
      title: 'Next repair',
      value: 'пока нема',
      type: 'repair',
    },
  ]
}