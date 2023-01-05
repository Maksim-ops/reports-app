<template>
  <div class="date">
    <h2>Выберите дату проведения мероприятия</h2>
    <Datepicker
      :dark="true"
      :modelValue="$store.state.report.selectedDate"
      @update:modelValue="setDate"
      :enableTimePicker=false
      modelType="yyyy-MM-dd"
      autoApply
      inline
    />
    <NavButtons
      :routes="[ '', '/region' ]"
      :text="[ '', 'ДАЛЕЕ' ]"
    />
  </div>
</template>

<script>
// https://vue3datepicker.com/api/props/#modelvalue
// https://vue3datepicker.com/api/events/
// https://github.com/Vuepic/vue-datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
//import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'


export default {
  name: 'DateView',
  components: {
    Datepicker
  },
  data: () => ({
  }),
  methods: {
    /*...mapState({
      dates: 'report/date'
    }),
    ...mapGetters({
      getDate: 'report/getDate'
    }),
    ...mapMutations({
      
    }),
    ...mapActions({

    }),*/
    setDate (value) {
      this.$store.commit('report/setDate', value)
      setTimeout(() => this.$router.push('/region'), 300);
    }
  }
}
</script>


<style>
.dp__main {
  position: relative;
  display: inline-block;
  margin: 0 auto;
}
</style>
