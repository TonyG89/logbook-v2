import { computed, reactive } from 'vue'
import moment from 'moment'

export default () => {
  let colDefs = []
  let row = []
  let tableProps = {}
  // const headerArray = [];
  // const logbook = {};
  let tableData = reactive({})

  // columnTitle
  const processProps = (props) => {
    console.log(props)
    tableProps = { ...props }
    tableRender()
    return tableProps
  }

  const tableRender = () => {

    const fields = Object.keys(tableProps._value[0])
    colDefs = fields.map(name => {
      const item = {
        headerName: name.toUpperCase(),
        field: name.toLowerCase(),
      }
      /** добавление других свойств в колонку */
      if (name === "isTrue" || name ==='') {  // пофиксить последний столбец(УДАЛИТ С ГУГЛА)
        item.hide = true // группировка
      }
      return item
    })
    // РАЗОБРАТЬСЯ С РЯДОМ
    row = tableProps._value?.map((item, ind) => ({
      ...item,
      date: moment(item.date).format('L'), // редактирование столбца
      kilometers: item.kilometers
        ? item.kilometers + ' км'
        : '-',
      details: item.details ? `${item.details} грн` : '-',
      work: item.work ? `${item.work} грн` : '-',
      actions: item.actions.toString(),
    }))

    /** прошлый, но с проблемами */
    // row = tableProps?.map((item, ind) => ({
    //   ...item,
    //   date: item.date.slice(0, 10), // редактирование столбца
    //   kilometers: `${item.kilometers
    //     ? item.kilometers
    //     : `> ${tableProps[ind + 1].kilometers}`
    //     } км`,
    //   details: item.details ? `${item.details} грн` : '-',
    //   work: item.work ? `${item.work} грн` : '-',
    // }))

    /** 
     * { Object }  tableData - xxxx
     * {Array} tableData.headerTitle - yyyy
     * {Array} tableData.items - row
    */
    tableData.value = {
      headerTitle: colDefs,
      items: row,
    }
    console.log(tableData)
    return tableData
  }

  const dataToDashboardInfo = (data, total = []) => {
    data.value?.map((log) => ({
      title: log.actions,
      value: log.tags || '-',
    }));
  };

  // DefaultColDef sets props common to all Columns
  const defaultColDef = {
    pinnedBottomRowConfig: [
      {
        field: 'name',
        title: 'Всего: ',
        type: 'int',
        aggAttrName: 'count',
      },
    ],
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };

  return {
    processProps,
    colDefs,
    tableData,
    tableRender,
    defaultColDef,
    row,
  }
}