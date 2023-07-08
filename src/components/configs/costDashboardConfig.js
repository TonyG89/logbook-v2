import {
  fullDate, quantityDay
} from '@/helpers/dates.js'
import { STATUS_CONFIG_TYPES } from '@/config/dataConfig.js'

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
  console.log(getStatusFilter(STATUS_CONFIG_TYPES.SHINOMONTAZH))

  const infoDashboard = [{
    title: 'За всё время:',
    value: getAmount('details') + getAmount('work'),
    type: 'amount',
  },
  {
    title: 'на детали:',
    value: getAmount('details'),
    type: 'amount',
  },
  {
    title: 'на работу:',
    value: getAmount('work'),
    type: 'amount',
  },
  {
    title: 'Шиномонтаж:',
    value: getAmount('details', STATUS_CONFIG_TYPES.SHINOMONTAZH) + getAmount('work', STATUS_CONFIG_TYPES.SHINOMONTAZH),
    type: 'categories',
  },
  {
    title: 'Расходка:',
    value: getAmount('details', STATUS_CONFIG_TYPES.RASHODKA) + getAmount('work', STATUS_CONFIG_TYPES.RASHODKA),
    type: 'categories',
  },
  {
    title: 'Поломка и износ:',
    value: getAmount('details', STATUS_CONFIG_TYPES.IZNOS) + getAmount('work', STATUS_CONFIG_TYPES.IZNOS) + getAmount('details', STATUS_CONFIG_TYPES.BROKEN) + getAmount('work', STATUS_CONFIG_TYPES.BROKEN),
    type: 'categories',
  },
  {
    title: 'Мой косяк:',
    value: getAmount('details', STATUS_CONFIG_TYPES.FORCE_MAJOR) + getAmount('work', STATUS_CONFIG_TYPES.FORCE_MAJOR),
    hint: 'Сумма включена в раздел "Поломка и износ"',
    type: 'categories',
  },
  {
    title: 'Диагностика:',
    value: getAmount('details', STATUS_CONFIG_TYPES.DIAGNOSTIC) + getAmount('work', STATUS_CONFIG_TYPES.DIAGNOSTIC),
    type: 'categories',
  },
  {
    title: 'Тюнинг:', // весь километраж с первой записи по последнею / количество дней/365
    value: getAmount('details', STATUS_CONFIG_TYPES.TUNING) + getAmount('work', STATUS_CONFIG_TYPES.TUNING),
    type: 'categories',
  }]

  return infoDashboard.map((obj) => ({ ...obj, value: obj.value + ' грн' }))
}