<template>
    <button class="btn">
      {{text}}
    </button>
</template>

<script>
export default {
  name: 'ReportButton',
  props: {
    text: String,
  }
}
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  /*background-color: burlywood;*/
  background: none;
  border: 1px solid rgb(145, 110, 66);
  
}
</style>
