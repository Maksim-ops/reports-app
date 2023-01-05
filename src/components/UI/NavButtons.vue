<template>
  <div class="nav-buttons">
    <div class="btn-div" v-for="(route, index) in routes" :key="route">
      <button
        v-if="route || text[index]"
        class="btn"
        @click="clickButton(
          { 
            id: index,
            route: route,
            text: index-1 < text.length ? text[index] : route,
            action: actions && index-1 < actions.length ? actions[index] : ''
          }
        )"
      >
        {{ index-1 < text.length ? text[index] : route }}
      </button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'NavButtons',
  data: () => ({
      route: 'test',
  }),
  props: {
    routes: {
      type: Array,
      required: true,
      default() {
        return [ '/' ]
      }
    },
    text: {
      type: Array,
      required: true,
      default() {
        return [ 'ГЛАВНАЯ' ]
      }
    },
    actions: {
      type: Array,
      required: false
    }
  },
  methods: {
    clickButton(routeObj) {
      this.$emit('select', routeObj)
      if(routeObj.action)
        this.$store.commit(routeObj.action)
      if(routeObj.route)
        this.$router.push(routeObj.route)
    },
  }
}
</script>

<style scoped>
.nav-buttons {
}
.btn-div {
  width: 100%;
  padding-left: 5px;
}
.btn {
  width: 100%;
  margin-top: 15px;
  padding: 10px 20px;
  margin-left: 5px;
  /*background-color: burlywood;*/
  border: 1px solid rgb(145, 110, 66);
  box-shadow: 0px 5px #ad8000;
  cursor: pointer;
  outline: none;
  text-align: center;
}
.btn:hover{
  background-color: #9c7300;
  box-shadow: 0px 5px #9c7300;
  color: #ffffff;
}
.btn:active {
  background-color: #3e8e41;
  color: #ffffff;
  box-shadow: 0px 5px #3e8e41;
  border: 1px solid #3e8e41;
  transform: translateY(4px);
}
</style>
