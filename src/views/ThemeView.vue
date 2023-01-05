<template>
  <div class="course">
    <h2>Выберите программу</h2>
    <Multiselect
      mode="single"
      v-model="$store.state.report.selectedCourse"
      @select="selectCourse"
      @clear="clearCourse"
      @open="openCourse"
      placeholder="Программа"
      :close-on-select="true"
      :searchable="false"
      :object="true"
      :groups="false"
      :resolve-on-load="false"
      :options="$store.state.report.rootCourses"
      ref="coursemultiselect"
    />

    <h2>Выберите тему мероприятия</h2>

    <Multiselect
      v-if="$store.state.report.singleMode"
      mode="single"
      :max=1
      :disabled="$store.state.report.isDisabledTheme"
      v-model="$store.state.report.selectedTheme"
      placeholder="Тема"
      :close-on-select="true"
      :searchable="true"
      :object="true"
      :groups="$store.state.report.isGrouppedThemes"
      :resolve-on-load="false"
      :options="$store.state.report.courseThemes"
      :create-option="false"
      ref="singlethememultiselect"
    />
    <Multiselect
      v-else
      mode="tags"
      :max=1
      v-model="$store.state.report.selectedTheme"
      placeholder="Тема"
      :close-on-select="true"
      :searchable="true"
      :object="true"
      :groups="false"
      :resolve-on-load="false"
      :options="$store.state.report.courseThemes"
      :create-option="true"
      :on-create="handleCreateTheme"
      ref="tagsthememultiselect"
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
  name: 'ThemeView',
  components: {
    Multiselect
  },
  data: () => ({
    routes: [ '/institution', '/stage' ],
    text: [ 'НАЗАД', 'ДАЛЕЕ' ]
  }),
  mounted() {
    if(store.state.report.selectedCourse && store.state.report.selectedCourse.value) {
      if(store.state.report.singleMode) {
        if(!store.state.report.selectedTheme || !store.state.report.selectedTheme.value)
          this.$refs.singlethememultiselect.open()
      } else {
        if(!store.state.report.selectedTheme || store.state.report.selectedTheme.length == 0)
          this.$refs.tagsthememultiselect.open()
      }
    } else {
      this.$refs.coursemultiselect.open()
      //this.$refs.coursemultiselect.$el.getElementsByTagName('input')[0].focus()
    }

      //this.$refs.thememultiselect.open()
    /*if(store.state.report.selectedCourse)
      this.isDisabledTheme = false
    else
      this.isDisabledTheme = true*/
  },
  methods: {
    openCourse() {
      if(this.$refs.singlethememultiselect)
        this.$refs.singlethememultiselect.close()
      if(this.$refs.tagsthememultiselect)
        this.$refs.tagsthememultiselect.close()
    },
    selectCourse(course) {
      store.commit('report/selectCourse', course)
      store.commit('report/disableThemes', false)
      if(course.value == 2) { // Равный равному
        store.commit('report/groupThemes', true)
      } else
        store.commit('report/groupThemes', false) // ЖО или ЧСЛ
      
      if(course.value == 1000) { // Индивидуальная тема
        this.routes[1] = '/hours'
        store.commit('report/setSingleMode', false)
        store.commit('report/selectTheme', [ ])
        setTimeout(() => {
          if(this.$refs.tagsthememultiselect) {
            this.$refs.tagsthememultiselect.open()
            this.$refs.tagsthememultiselect.$el.getElementsByTagName('input')[0].focus()
          }
        }, 200)
      } else {
        this.routes[1] = '/stage'
        store.commit('report/setSingleMode', true)
        store.commit('report/selectTheme', {})
        setTimeout(() => {
          if(this.$refs.singlethememultiselect) {
            this.$refs.singlethememultiselect.open()
            this.$refs.singlethememultiselect.$el.getElementsByTagName('input')[0].focus()
          }
        }, 200)
      }
    },
    clearCourse() {
      store.commit('report/disableThemes', true)
      store.commit('report/groupThemes', false)
      store.commit('report/setSingleMode', true)
      store.commit('report/selectTheme', {})
      store.commit('report/selectCourse', {})
    },    
    //handleCreateTheme: async (option, select$) => {
// https://github.com/vueform/multiselect?ref=madewithvuejs.com#manage-created-tag-asynchronously
    handleCreateTheme: async (option) => {
      store.commit('report/setNewTheme', {name: option.label, courseId: 3} )
      const newTheme = await store.dispatch('report/createTheme')
      // Do not allow create tags above 67
      /*if (parseInt(option.value) > 67) {
        alert(`${option.value} is not allowed. Option must by <= 67.`)

        // If returns `false` the tag will not be added
        return false
      }

      // Async request (eg. for validating)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })*/

      const newOption = { label: newTheme.label, value: newTheme.value }
      return newOption
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>