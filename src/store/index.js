import { createStore } from 'vuex'
import { reportModule } from '@/store/reportModule'

export default createStore({
  modules: {
    report: reportModule
  }
})
