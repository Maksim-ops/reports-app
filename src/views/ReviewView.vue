<template>
  <div class="review">
    <h2>Просмотр</h2>
    <ReviewItem
      :header="'Дата'"
      :value="$store.state.report.selectedDate"
    />
    <ReviewItem
      :header="$store.state.report.selectedRegion ? $store.state.report.selectedRegion.label : ''"
      :value="$store.state.report.selectedSettlement ? $store.state.report.selectedSettlement.label : ''"
    />
    <ReviewItem
      :header="'Волонтеры'"
      :values="$store.state.report.selectedVolunteers.map(v => v.label)"
    />
    <ReviewItem
      :header="'Учреждение'"
      :value="$store.state.report.selectedInstitution ? $store.state.report.selectedInstitution.label : ''"
    />
    <ReviewItem
      :header="'Группа'"
      :value="$store.state.report.selectedGroups.reduce((res, item) => res + item.label + ', ','').slice(0, -2)"
    />
    <ReviewItem
      :header="'Кол-во'"
      :value="$store.state.report.selectedNumber"
    />
    <ReviewItem
      :header="$store.state.report.selectedCourse ? $store.state.report.selectedCourse.label : ''"
      :value="$store.state.report.selectedTheme ? $store.state.report.selectedTheme.label : ''"
    />
    <ReviewItem
      :header="'Этап'"
      :value="$store.state.report.selectedStage ? $store.state.report.selectedStage.text : ''"
    />
    <ReviewItem
      :header="'Часы'"
      :value="$store.state.report.selectedHours ? $store.state.report.selectedHours.text : ''"
    />
    <ReviewItem
      :header="'Фото'"
      :value="$store.state.report.selectedImages ? $store.state.report.selectedImages.reduce((res, item) => res + item.name + ', ','').slice(0, -2) : ''"
    />
    
    <!-- 
      <p v-if="$store.state.report.message">{{$store.state.report.message}}</p>
      -->
    <NavButtons 
      :routes="routes"
      :text="text"
      :actions="actions"
    />
  </div>
</template>

<script>
import ReviewItem from '@/components/ReviewItem';

export default {
  name: 'ReviewView',
  components: {
    ReviewItem
  },
  data: () => ({
    message: 'asdf',
    routes: [ '/images', '' ],
    text: [ 'НАЗАД', 'ОТПРАВИТЬ' ],
    actions: [ '', 'report/sendReport' ],
    ifsuccess: true
  }),
  methods: {
    sendReport() {
      //this.$store.commit('report/sendReport')
      //this.$store.commit('report/setDefault')
    }
  }
}
</script>
<style>

</style>