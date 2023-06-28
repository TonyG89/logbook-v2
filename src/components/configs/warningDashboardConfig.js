export default function (data) {
  const newItem = data.value[0]
  const oldItem = data.value.at(-1)


  const entities = [

    {
      title: "ТО газ",
      value: 'kkk',
      limit: 10000,
    },
    {
      title: "Замена фильтров",
      value: 'kkk',
      limit: '',
    },

    {
      title: "Замена масла",
      value: 'kkk',
      limit: 10000,
    },
    {
      title: "Колеса",
      value: 'kkk',
      limit: '180',
    },

    {
      title: "Тормоза",
      value: 'kkk',
      limit: 50000,
    },
    {
      title: "ТО ходовая",
      value: 'kkk',
      limit: '720',
    },
    {
      title: "Антифриз",
      value: 'kkk',
      limit: 50000,
    },
    {
      title: "Двигатель",
      value: 'kkk',
      limit: 10000,
    },
    {
      title: "ГУР",
      value: 'kkk',
      limit: 30000,
    },
  ]
  const status = data.value.filter(obj => obj.status === 'расходка')
  const setArr = new Set(status.map(({ categories }) => categories))
  console.log(setArr)

  return entities
}