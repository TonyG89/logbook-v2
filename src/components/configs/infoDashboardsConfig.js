
import {
  fullDate, quantityDay
} from '@/helpers/dates.js'

export default function computedData(params) {


  const allStatistic = (data) => {
    const newItem = data.value[0]
    const oldItem = data.value.at(-1)
    // DATE
    const fromBoughtToToday = new Date() - new Date(oldItem.date)
    const countDaysFromLastAction = new Date() - new Date(newItem.date)
    const dataThisYear = data.value?.filter(({ date }) => date.includes('2023'))
    const dataLastYear = data.value?.filter(({ date }) => date.includes('2022'))
    const lastDateKilometers = dataThisYear.at(-1).kilometers || (dataThisYear.at(-2).kilometers + data.value[dataThisYear.length + 1].kilometers) / 2
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

    // DATE
    const fromBoughtToToday = new Date() - new Date(oldItem.date)
    const countDaysFromLastAction = new Date() - new Date(newItem.date)

    const totalDays = quantityDay(fromBoughtToToday)
    const totalDistance = newItem.kilometers - oldItem.kilometers

    return [{
      title: 'дней в эксплуатации',
      value: [totalDays + 'дней'],
    },
    {
      title: 'Общее растояние',
      value: totalDistance + 'км',
    },
    {
      title: 'Средняя растояние',
      value: Math.round(totalDistance / totalDays * 365) + 'км/год',
    },
    {
      title: 'Средняя растояние',
      value: (totalDistance / totalDays).toFixed(2) + 'км/день',
    },
    // ВКЛАДКА: ПОТРАЧЕНО <HR>
    {
      title: 'Общее потрачено',
      value: null
    },
    {
      title: 'Тратиться в среднем за год',
      value: null
    },
    {
      title: 'Тратиться в среднем за месяц',
      value: null
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
