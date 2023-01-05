<template>
  <div class="volunteers">
    <h2>Выберите волонтеров</h2>
    <Multiselect
      mode="tags"
      v-model="$store.state.report.selectedVolunteers"
      placeholder="Волонтеры"
      :disabled="$store.state.report.isDisabledVolunteers"
      :close-on-select="false"
      :searchable="true"
      :create-option="true"
      :groups="false"
      :object="true"
      :resolve-on-load="false"
      :options="$store.state.report.regionVolunteers"
      :on-create="handleTagCreate"
      ref="volunteersmultiselect"
    />
    <NavButtons
      :routes="routes"
      :text="text"
    />
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';

export default {
  name: 'VolunteersView',
  components: {
    Multiselect
  },
  data: () => ({
      routes: [ '/region', '/institution' ],
      text: [ 'НАЗАД', 'ДАЛЕЕ' ]
  }),
  mounted() {
    if(!this.$store.state.report.isDisabledVolunteers) {
      this.$refs.volunteersmultiselect.open()
      this.$refs.volunteersmultiselect.$el.getElementsByTagName('input')[0].focus()
    }
  },
  methods: {
    //handleTagCreate: async (option, select$) => {
    handleTagCreate: async (option) => {
      // 'Lastname F. M.' or 'Lastname F M' or 'Lastname FM' or 'Lastname F.M.'
      const regex = /^([А-Я][а-я]*) ([А-Я])[\\.]{0,1}[ ]{0,1}([А-Я])[\\.]{0,1}$/;
      const found = option.label.match(regex)
      if (!found) {
        alert(`${option.value} Слишком длинное ФИО`)
        return false
      }

      // Async request (eg. for validating)
      // Create new volunteer
      /*await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })*/

      // Modifying option label
      //option.label = option.label + ' - confirmed'
      if(found.length > 3)
        option.label = found[1] + ' ' + found[2] + ' ' + found[3]

      return option
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>