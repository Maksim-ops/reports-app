<template>
  <div class="stage">
    <h2>На каком этапе программа?</h2>
    <div style="width: 200px; margin: 0 auto;">
      <NavButtons
        class="select-buttons"
        :routes="routes"
        :text="text"
        @select="selectStage"
      />
      <NavButtons
        :routes="[ '/theme', ''  ]"
        :text="[ 'НАЗАД', '' ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StageView',
  data: () => ({
      route: '',
      routes: [ '/hours', '/hours', '/hours', '/hours' ],
      text: [ 'ЕДИНОРАЗОВО', 'НАЧАЛО', 'ПРОДОЛЖЕНИЕ', 'ЗАВЕРШЕНИЕ' ]
  }),
  methods: {
    selectStage(stage) {
      this.$store.commit('report/setStage', stage)
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