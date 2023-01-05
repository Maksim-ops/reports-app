<template>
  <router-view id="content" />
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    this.$store.commit('report/setDate', date)
    this.$store.commit('report/getDefault')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  --scrollbarBG: #CFD8DC;
  --thumbBG: #90A4AE;
}
#app {
  width: 100%;
  height: 100%;
  min-height: 550px;
  display: block;
  position: absolute;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d3ba30;
  /*background-image: url("./assets/bg.jpg");*/
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('./assets/bg.jpg');
  -webkit-background-size: cover;
  -moz-background-size:  cover;
  -o-background-size: cover;
  background-size: cover;
  
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}

#content {
  width: 80%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid lightgray;
  padding: 4rem 4rem;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.7);

}
.numberinput{
  width: 100%;
  background: none;
  border: 1px solid #7e701f;
  border-radius: 2px;
  color: #ffe134;
  font-size: 1rem;
  padding: 7px 10px;
}

.multiselect{ 
  background: none !important;
  border: 1px solid #7e701f !important;
}
.multiselect input{ 
  background: none !important;
}
.multiselect-caret {
  background: #7e701f !important;
}
.multiselect-dropdown {
  background: rgb(32, 32, 32) !important;
}
.multiselect-option.is-pointed {
  background: rgba(60, 60, 60, 1) !important;
  color: #ffe134 !important;
}
.multiselect-option.is-selected {
  background: #0b6446 !important;
}
.multiselect-tag {
  background: #0b6446 !important;
  color: #ffe134 !important;
}
.multiselect-no-options {
  color: #ffe134 !important;
}
/*.multiselect-group-label.is-pointed {
  background: rgba(0, 0, 0, 1) !important;
}*/
.multiselect-group-label{
  background: rgb(32, 32, 32) !important;
}
.multiselect-group-label span{
  color: #f5e589 !important;
}
.multiselect-search {
  color: #a1ffa6 !important;
}
.multiselect-tags-search {
  color: #a1ffa6 !important;
}
.is-disabled {
  background: rgb(0, 0, 0) !important;
}
.file-select{
  background: none !important;
  border: 2px solid #7e701f !important;
}
.file-upload input{
  background-color: rgba(0, 0, 0, 0.7);
}
.nav-buttons {
  width: 100%;
  margin-bottom: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
}
.nav-buttons .btn {
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  color: #efffb1;
  background-color: #ad8000;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.Vue-Toastification__toast--warning {
    background-color: #a37a00cc !important;
}

@media only screen and (max-width: 600px) {
  #content {
    padding: 1rem 1rem;
  }
  h2 {
    margin-top: 5px;
    margin-left: 10px;
  }
}

</style>
