<template>
  <div class="region">
    <h2>Выберите регион</h2>
    <Multiselect
      mode="single"
      v-model="$store.state.report.selectedRegion"
      @select="selectRegion"
      @clear="clearRegion"
      placeholder="Регион"
      :close-on-select="true"
      :searchable="false"
      :object="true"
      :groups="false"
      :resolve-on-load="false"
      :options="$store.state.report.regions"
      ref="regionmultiselect"
    />

    <h2>Выберите населенный пункт</h2>
    <Multiselect
      mode="single"
      v-model="$store.state.report.selectedSettlement"
      @select="selectSettlement"
      @clear="clearSettlement"
      placeholder="Населенный пункт"
      :close-on-select="true"
      :searchable="true"
      :object="true"
      :groups="false"
      :resolve-on-load="false"
      :options="$store.state.report.regionSettlements"
      :create-option="true"
      :on-create="handleCreateSettlement"
      ref="settlementmultiselect"
    />
    <NavButtons
      :routes="routes"
      :text="text"
    />
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import store from '@/store'

export default {
  name: 'RegionView',
  components: {
    Multiselect
  },
  data: () => ({
    routes: [ '/', '/volunteers' ],
    text: [ 'НАЗАД', 'ДАЛЕЕ' ]
  }),
  mounted() {
    if(!store.state.report.selectedRegion || Object.keys(store.state.report.selectedRegion).length === 0)
      this.$refs.regionmultiselect.open()
    //отсутствует фокус
    //this.$refs.regionmultiselect.$el.getElementsByTagName('input')[0].focus()
  },
  methods: {
    selectRegion(region) {
      store.commit('report/setDisabledVolunteers', false)
      // TODO исправить дваждый устанавливается selectedRegion
      //store.commit('report/setSelectedSettlement', store.state.report.settlements)
      store.commit('report/selectSettlement', [])
      store.commit('report/selectRegion', region)
      this.$refs.settlementmultiselect.open()
      this.$refs.settlementmultiselect.$el.getElementsByTagName('input')[0].focus()
    },
    clearRegion() {
      store.commit('report/setDisabledVolunteers', true)
      store.commit('report/selectRegion', [])
      store.commit('report/selectSettlement', {})
      store.commit('report/selectVolunteers', [])
      store.commit('report/selectInstitution', [])
      store.commit('report/selectGroups', [])
      store.commit('report/setRegionSettlements', store.state.report.settlements)
      store.commit('report/setRegionVolunteers', store.state.report.volunteers)
      store.commit('report/setRegionInstitutions', store.state.report.regionInstitutions)
    },
    clearSettlement() {
      store.commit('report/selectSettlement', {})
      store.commit('report/selectVolunteers', [])
      store.commit('report/selectInstitution', {})
      store.commit('report/selectGroups', [])
      store.commit('report/setRegionVolunteers', store.state.report.volunteers)
    },
    selectSettlement(settlement) {
      if(!store.state.report.selectedRegion || Object.keys(store.state.report.selectedRegion).length === 0) {
        const region = store.state.report.regions.find(r => r.value === settlement.regionId)
        store.commit('report/selectRegion', region)
        store.commit('report/selectVolunteers', [])
      }
      store.commit('report/selectSettlement', settlement)
      if(!store.state.report.newSettlement.value)
        this.$router.push('/volunteers')
    },
    handleCreateSettlement: async (option) => {
      if(option.label.length > 3) {
        store.commit('report/setNewSettlement', {name: option.label, regionId: store.state.report.selectedRegion.value} )
        const newSettlement = await store.dispatch('report/createSettlement')
        const newOption = { label: newSettlement.label, value: newSettlement.value }
        return newOption
      } else
      return false
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>