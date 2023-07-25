
import {
  quantityDay
} from '@/helpers/dates.js'

export default function averageStatistic(data) {
  const newItem = data.value[0]
  const oldItem = data.value.at(-1)
  const getAmount = (work, filteredValue = '') => {
    let amount
    if (!filteredValue) amount = data.value?.reduce((sum, item) => sum + +item[work], 0)
    else {
      const filteredObj = data.value.filter(obj => obj.status === filteredValue)
      amount = filteredObj?.reduce((sum, item) => sum + +item[work], 0)
    }
    return amount
  }
  // DATE
  const fromBoughtToToday = new Date() - new Date(oldItem.date)

  const totalDays = quantityDay(fromBoughtToToday)
  const totalDistance = newItem.kilometers - oldItem.kilometers

  return [
    {
      title: 'Spent per year',
      value: [Math.round((getAmount('details') + getAmount('work')) / totalDays * 365) + ' грн/год'],
      type: 'costs',
    },
    // TODO: сделать текущий год
    // {
    //   title: 'Spent сurrent year',
    //   value: [Math.round((getAmount('details') + getAmount('work')) / totalDays * 365) + ' грн/год'],
    //   type: 'costs',
    // },
    {
      title: 'Spent per month',
      value: [Math.round((getAmount('details') + getAmount('work')) / totalDays * 30) + ' грн/месяц'],
      type: 'costs',
    },
    {
      title: 'Spent per day',
      value: [Math.round((getAmount('details') + getAmount('work')) / totalDays) + ' грн/день'],
      type: 'costs',
    },
    {
      title: 'Drow per year',
      value: [Math.round(totalDistance / totalDays * 365) + 'км/год'],
      type: 'distance',
    },
    {
      title: 'Drow per month',
      value: [Math.round(totalDistance / totalDays * 30) + 'км/месяц'],
      type: 'distance',
    },
    {
      title: 'Drow per day',
      value: [(totalDistance / totalDays).toFixed(2) + 'км/день'],
      type: 'distance',
    },
    {
      title: 'Cost per kilometer',
      value: [((getAmount('details') + getAmount('work')) / totalDistance).toFixed(2) + 'грн'],
      hint: 'это стоимость без расхода топлива',
      type: 'costKm',
    }
  ]
}
