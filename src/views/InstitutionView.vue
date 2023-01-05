<template>
  <div class="institution">
    <h2>Выберите образовательное учреждение</h2>
    <Multiselect
      mode="single"
      v-model="$store.state.report.selectedInstitution"
      @select="selectInstitution"
      @clear="clearInstitution"
      placeholder="Оразовательное учреждение"
      :close-on-select="true"
      :searchable="true"
      :object="true"
      :groups="false"
      :resolve-on-load="false"
      :options="$store.state.report.regionInstitutions"
      :create-option="true"
      :on-create="handleCreateInstitution"
      ref="institutionmultiselect"
    />

    <h2>Выберите группу/класс</h2>
    <Multiselect
      mode="tags"
      v-model="$store.state.report.selectedGroups"
      @close="closeGroupMultiselect"
      placeholder="группа(ы) или класс(ы)"
      :disabled="false"
      :close-on-select="false"
      :searchable="true"
      :object="true"
      :groups="false"
      :resolve-on-load="false"
      :options="$store.state.report.institutionGroups"
      :create-option="true"
      :on-create="handleCreateGroup"
      ref="groupsmultiselect"
    />

    <h2>Количество слушателей</h2>
    <NumberInput
      v-model="$store.state.report.selectedNumber"
      placeholder="Число"
      ref="numbergroup"
      class="numberinput"
    />
    <NavButtons
      :routes="routes"
      :text="text"
    />
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import store from '@/store'
import { useToast } from "vue-toastification";

export default {
  name: 'InstitutionView',
  components: {
    Multiselect
  },
  data: () => ({
      routes: [ '/volunteers', '/theme' ],
      text: [ 'НАЗАД', 'ДАЛЕЕ' ],
  }),
  /*setup() {
      // Get toast interface
      const toast = useToast();

      // Use it!
      toast("1I'm a toast!");

      // or with options
      toast.success("2My toast content", {
        timeout: 2000
      });
      // These options will override the options defined in the "app.use" plugin registration for this specific toast

      // Make it available inside methods
      return { toast }
  },*/
  mounted() {
    if(!store.state.report.selectedInstitution || !store.state.report.selectedInstitution.value) {
      this.$refs.institutionmultiselect.open()
      this.$refs.institutionmultiselect.$el.getElementsByTagName('input')[0].focus()
    } else if(store.state.report.selectedGroups.length == 0) {
      this.$refs.groupsmultiselect.open()
      this.$refs.groupsmultiselect.$el.getElementsByTagName('input')[0].focus()
    }
  },
  methods: {
    toToast() {
      const toast = useToast();
      //this.$toast.info("3I'm an info toast!");
      //this.$toast("I'm a toast!");
      toast.error('Test', {timeout: 10000})
    },
    selectInstitution(institution) {
      this.clearInstitution()
      store.commit('report/selectInstitution', institution)
      this.$refs.groupsmultiselect.open()
      this.$refs.groupsmultiselect.$el.getElementsByTagName('input')[0].focus()
    },
    clearInstitution() {
      store.commit('report/clearInstitution')
    },
    closeGroupMultiselect() {
      //this.$refs.numbergroup.$el.getElementsByTagName('input')[0].focus()
      this.$refs.numbergroup.$el.focus()
    },
    handleCreateInstitution: async (option) => {
      if(option.label.length > 2) {
        let newInstitution = {
          name: option.label,
          typeId: 1,
          regionId: store.state.report.selectedRegion.value,
          settlementId: store.state.report.selectedSettlement.value
        }
        store.commit('report/setNewInstitution', newInstitution)
        newInstitution = await store.dispatch('report/createInstitution')
        const newOption = { label: newInstitution.label, value: newInstitution.value }
        return newOption
      } else
      return false
    },
    handleCreateGroup: async (option) => {
      // 7 кл
      // 377/1 гр
      // 7-9 кл
      /*const regex = /(кл|гр|г.|к.)/
      const found = option.label.match(regex)
      if (found) {
        alert(`В названии не указывайтe класс или группа`)
        return false
      }*/
      let newGroup = {
        name: option.label,
        regionId: store.state.report.selectedRegion.value,
        settlementId: store.state.report.selectedSettlement.value,
        institutionId: store.state.report.selectedInstitution.value
      }
      store.commit('report/setNewGroup', newGroup)
      newGroup = await store.dispatch('report/createGroup')
      const newOption = { label: newGroup.label, value: newGroup.value }
      return newOption
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>