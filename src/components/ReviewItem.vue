<template>
  <div class="review-item">
    <div class="item-h">
      <p>{{ header }}</p>
    </div>
    <div v-if="values" class="items-v">
      <p v-for="(val, ind) in values" :key="ind" class="item-v">
        {{ val }}
      </p>
    </div>
    <div v-else class="items-v" >
      <p class="item-v">{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewItem',
  props: {
    header: {
      type: String
    },
    values: {
      type: Array
    },
    value: {
      type: String
    }
  }
}
</script>
<style>
.review-item {
  width: 100%;
  border-bottom: 1px solid #36300d;
  margin-top: 3px;
}
.item-h {
  display: inline-block;
  width: 30%;
  text-align: right;
  /*padding: 5px 5px;*/
}
.items-v {
  display: inline-block;
  width: 70%;
  text-align: left;
  padding-left: 10px;
}
</style>
