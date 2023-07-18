
import {
  fullDate, quantityDay
} from '@/helpers/dates.js'
import moment from 'moment'


export default function computedData() {

  const allStatistic = (data) => {
    const newItem = data.value[0]
    const oldItem = data.value.at(-1)
    const currentYear = moment().year()
    const getDataYear = (year) => {
      return data.value?.filter(({ date }) => date.includes(year))
    }
    const daysOnThisYear = (new Date(getDataYear(currentYear)[0].date) - new Date(getDataYear(currentYear).at(-1).date)) / 86400000

    // DATE
    const fromBoughtToToday = new Date() - new Date(oldItem.date)
    const countDaysFromLastAction = new Date() - new Date(newItem.date)
    const dataThisYear = data.value?.filter(({ date }) => date.includes(currentYear))
    const dataLastYear = data.value?.filter(({ date }) => date.includes(currentYear - 1))
    const quantityDays = oldItem.date
    return [{
      title: 'Срок службы:',
      value: fullDate(fromBoughtToToday),
    },
    {
      title: 'Последние манипуляции:',
      value: fullDate(countDaysFromLastAction).join(' ') || 'сегодня',
    },

    ]
  }



  //! сделать с кнопкой выбора года а пока используем averageStatistic
  // const averageOfYear = (year: number): dashBoardInformationArray[] => [{
  //   title: 'Километров проехал',
  //   value: null,
  // },
  // // ВКЛАДКА: ПОТРАЧЕНО
  // {
  //   title: 'на детали',
  //   value: null
  // },
  // {
  //   title: 'на работу',
  //   value: null
  // },
  // {
  //   title: 'сумма',
  //   value: null
  // },
  // {
  //   title: 'Километров проехал',
  //   value: null
  // },
  // ]

  const averageStatistic = (data) => {
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
    ]
  }

  const wastedMoney = (data) => {
    // ВКЛАДКА: ПОТРАЧЕНО <HR>
    return [{
      title: 'на детали',
      value: '',
      // data.value?.reduce((acc, { details }) => ({
      //   acc + details
      // }, 0))
    },
    {
      title: 'на работу',
      value: null
    },
    {
      title: 'сумма',
      value: null
    }]
  }

  const valueMinMax = (data) => {
    return [
      // MIN
      {
        title: 'самый дешевый год по затратам',
        value: null
      },
      {
        title: 'меньше всего выкатал',
        value: null
      },
      {
        title: 'меньше всего ремонтировал за год и количество',
        value: null
      },
      // MAX
    ]
  }


  return {
    allStatistic,
    // averageOfYear,
    averageStatistic,
    wastedMoney,
  }
};
