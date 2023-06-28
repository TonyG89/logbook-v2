import { ref, reactive } from 'vue'

export default function useLogbook() {
  const logbookList = ref([]);
  const logbookItem = reactive({})

  const key = 'AKfycbzVwiK48W-NEXBhj2pWXMAIuaMdJ2rGjCvfmTZ_BJrDgzkM2hCFXUrMpoUcRCTGB5Xq';
  const url = `https://script.google.com/macros/s/${key}/exec`;

  const getLogbookList = () => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => {
          localStorage.setItem('logbookList', JSON.stringify(res));

          return res.json()
        })
        .then(({ data }) => {
          logbookList.value = data
          return resolve(data)
        })
        .catch(err => {
          console.error(err)
          return reject(err)
        })
        // .finally(() => console.log(logbookList.value))
    })
  }
  // TODO: logbookItem
  const getLogbookLItem = (id) => {
    console.log(getLogbookList().then)
  }

  return {
    logbookList,
    logbookItem,
    getLogbookList,
    getLogbookLItem,
  }
}


