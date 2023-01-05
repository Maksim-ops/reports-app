<template>
  <div class="hours">
    <h2>Сколько академических часов длилась тема?</h2>
    <p>1 - 40-45 минут, 2 - 90 минут</p>

    <NavButtons 
      class="select-buttons"
      :routes="routes"
      :text="text"
      @select="selectHour"
    />
      <NavButtons
        :routes="[ '/stage', '' ]"
        :text="[ 'НАЗАД', '' ]"
      />
  </div>
</template>

<script>
export default {
  name: 'HoursView',
  data: () => ({
    routes: [ '/images', '/images', '/images' ],
    text: [ '1/2', '1', '2' ]
  }),
  methods: {
    selectHour(hour) {
      this.$store.commit('report/setHour', hour)
    }
  }
}
</script>

<style>
.select-buttons {
  position: relative;
  width: 180px;
  margin-bottom: none;
  bottom: none;
  left: none;
  display: inline-block;
  align-items: center;
  justify-content: center;
}
.select-buttons .btn {
  background-color: #705300;
}
</style>