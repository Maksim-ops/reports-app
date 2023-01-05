<template>
    <input
      :placeholder="placeholder"
      :value="modelValue"
      @keydown="onlyNumbers"
      @input="updateInput"
    />
</template>

<script>
export default {
  name: 'NumberInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Количество'
    }
  },
  methods: {
    onlyNumbers (event) {
      if(!(event.key >= '0' && event.key <= '9' || 
        event.key == 'Backspace' ||
        event.key == 'Delete' ||
        event.key == 'ArrowLeft' ||
        event.key == 'ArrowRight' ||
        event.key == 'Home' ||
        event.key == 'End'
      ))
        event.preventDefault()
    },
    updateInput(event) {
        this.$emit("update:modelValue", event.target.value);
    }
  }
}
</script>

<style scoped>
</style>
