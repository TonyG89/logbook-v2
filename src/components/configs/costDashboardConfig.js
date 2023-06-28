import {
  fullDate, quantityDay
} from '@/helpers/dates.js'

export default function (data) {
  const newItem = data.value[0]
  const oldItem = data.value.at(-1)
  const myTotalOwnDays = new Date(newItem.date) - new Date(oldItem.date)

  const totalDays = quantityDay(myTotalOwnDays)
  /**
   * @title Фильтрация по году
   * @param {number} год, по которому будет осуществляться фильтрация
   * @return {Array} отфильтрованные данные
   */
  const getDataYear = (year) => {
    return data.value?.filter(({ date }) => date.includes(year))
  }

  const getAmount = (work, filteredValue = '') => {
    let amount
    if (!filteredValue) amount = data.value?.reduce((sum, item) => sum + +item[work], 0)
    else {
      const filteredObj = data.value.filter(obj => obj.status === filteredValue)
      amount = filteredObj?.reduce((sum, item) => sum + +item[work], 0)
    }
    return amount
  }

  const getAmountFilteredStatus = (work, statusValue, key = 'status') => data.value.filter(obj => obj.status === statusValue || obj.categories === statusValue).reduce((sum, item) => sum + +item[work], 0)

  const amountAll = getAmount('details') + getAmount('work')

  const amountStatus = () => getAmount('details') + getAmount('work')

  const getAmountForStatus = (v) => data.value?.reduce((sum, item) => sum + +item[v], 0)

  const getFilter = (v) => data.value?.filter(obj => obj[v])

  const getStatusFilter = (statusValue) => data.value?.filter(obj => obj.status === statusValue)?.status
  console.log(getStatusFilter('шинка'))

  const infoDashboard = [{
    title: 'За всё время:',
    value: getAmount('details') + getAmount('work'),
  },
  {
    title: 'на детали:',
    value: getAmount('details'),
  },
  {
    title: 'на работу:',
    value: getAmount('work'),
  },
  {
    title: 'Шиномонтаж:',
    value: getAmount('details', 'шинка') + getAmount('work', 'шинка'),
  },
  {
    title: 'Расходка:',
    value: getAmount('details', 'расходка') + getAmount('work', 'расходка'),
  },
  {
    title: 'Поломка и износ:',
    value: getAmount('details', 'износ') + getAmount('work', 'износ') + getAmount('details', 'поломка') + getAmount('work', 'поломка'),
  },
  {
    title: 'Мой косяк:',
    value: getAmount('details', 'мой косяк') + getAmount('work', 'мой косяк'),
    hint: 'Сумма включена в раздел "Поломка и износ"'
  },
  {
    title: 'Диагностика:',
    value: getAmount('details', 'диагностика') + getAmount('work', 'диагностика'),
  },
  {
    title: 'Тюнинг:', // весь километраж с первой записи по последнею / количество дней/365
    value: getAmount('details', 'тюнинг') + getAmount('work', 'тюнинг'),
  },
  // СДЕЛАТЬ ОТЧЕТ ЗА ГОД ОДЕЛЬНО
  {
    title: 'за 2019 год:',
    value: '',
  },
  {
    title: 'за 2020 год:',
    value: '',
  },
  {
    title: 'за 2021 год:',
    value: '',
  },
  {
    title: 'за прошлый год:',
    value: '',
  },
  {
    title: 'за текущий год:',
    value: (amountAll / totalDays * 365).toFixed(2),
  },
  {
    title: 'Среднее за год:',
    value: (amountAll / totalDays * 365).toFixed(2),
  },
  {
    title: 'Среднее за день:',
    value: (amountAll / totalDays).toFixed(2),
  }]

  return infoDashboard.map((obj) => ({ ...obj, value: obj.value + ' грн' }))
}