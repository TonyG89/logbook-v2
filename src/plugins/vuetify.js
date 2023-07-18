/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
// import colors from 'vuetify/lib/util/colors' // colors.red.darken1
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#EEFF41', //lime-accent-2
          secondary: '#AED581', //light-green-lighten-2
          background: '#AED581',
          title:'#4E342E',
          dashboard:'#455A64',
          dashboardList: '#DCEDC8', //light-green-accent-1
          surface: '#FFFFFF',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
})
