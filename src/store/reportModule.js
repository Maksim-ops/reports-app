import axios from "axios"
import { useToast } from 'vue-toastification'
import router from '@/router'
const toast = useToast()

export const reportModule = {
  state: () => ({
    // user variables
    userId: 0,
    username: 'life',
    jwt: '',
    message: '',
    isLoadedData: false,
    isDisabledVolunteers: true,
    isReported: false,
    //
    selectedDate: '',
    selectedNumber: '',
    selectedHours: 0, //0 = 1/2ч
    selectedStage: '',
    selectedImages: [],
    //
    regions: [],
    selectedRegion: [],
    //
    settlements: [],
    regionSettlements: [],
    selectedSettlement: {},
    newSettlement: {},
    //
    volunteers: [],
    regionVolunteers: [],
    selectedVolunteers: [],
    //
    courses: [],  // all
    rootCourses: [], // courses without parent course (parentId=0)
    selectedCourse: {},
    //
    themes: [],
    courseThemes: [],
    selectedTheme: {},
    singleMode: true,
    isGrouppedThemes: false,
    isDisabledTheme: true,
    newTheme: {},
    //
    institutions: [],
    regionInstitutions: [],
    selectedInstitution: {},
    newInstitution: {},
    //
    groups: [],
    institutionGroups: [],
    selectedGroups: [],
    newGroup: {},
    isDisabledGroups: true,
    //
    comment: ''
    //
  }),
  getters: {
    isReported(state) {
      state.isReported
    },
    getDate(state) {
      return state.date
    },
    /*getCourses: state => {
      //return state.todos.filter(todo => todo.done);
      return state.courses
    },
    getThemes(state) {
      return state.themes.find(t => t.value === state.selectCourse.value)
    },
    getGroups(state) {
      return state.allGroups
    }*/
  },
  mutations: {
    setDefault(state) {
      const selectedEntities = {
        selectedRegion: state.selectedRegion,
        selectedSettlement: state.selectedSettlement,
        selectedVolunteers: state.selectedVolunteers,
        selectedInstitution: state.selectedInstitution,
        //selectedCourse: state.selectedCourse,
        //regionSettlements: state.regionSettlements,
        //regionInstitutions: state.regionInstitutions,
      }
      localStorage.setItem("selectedEntities", JSON.stringify(selectedEntities))
    },
    getDefault(state) {
      if(localStorage.getItem("selectedEntities")) {
        const selectedEntities = JSON.parse( localStorage.getItem("selectedEntities") )
        if(selectedEntities) {
          if(selectedEntities.selectedRegion)
            state.selectedRegion = selectedEntities.selectedRegion
          if(selectedEntities.selectedSettlement) {
            state.selectedSettlement = selectedEntities.selectedSettlement
            state.isDisabledVolunteers = false
          }
          if(selectedEntities.selectedVolunteers)
            state.selectedVolunteers = selectedEntities.selectedVolunteers
          if(selectedEntities.selectedInstitution)
            state.selectedInstitution = selectedEntities.selectedInstitution
          /*if(selectedEntities.selectedCourse) {
            state.selectedCourse = selectedEntities.selectedCourse
            state.isDisabledTheme = false
          }*/
        }
      }
    },
    setJWT(state, jwt) {
      state.jwt = jwt
      localStorage.setItem("JWT", JSON.stringify(jwt))
    },
    clearJWT(state) {
      state.jwt = ''
      localStorage.removeItem("JWT")
    },
    setMessage(state, message) {
      state.message = message
    },
    setDate(state, date) {
      state.selectedDate = date
    },
    setHour(state, hour) {
      state.selectedHours = hour
    },
    setStage(state, stage) {
      state.selectedStage = stage
    },
    selectImages(state, images) {
      state.selectedImages = images
    },
    //
    setCourses(state, courses) {
      state.courses = courses
    },
    setDisabledVolunteers(state, disabledVolunteers) {
      state.isDisabledVolunteers = disabledVolunteers
    },
    selectCourse(state, course) {
      state.selectedCourse = course
      if(course && course.value) {
        if(course.value == 2) { // Равный Равному
          let courseThemes = []
          const courseRR = state.themes[1].options
          courseRR.forEach((el) => {
            const option = { value: el.value, label: el.label }
            const objIndex = courseThemes.findIndex(t =>t.value === el.courseId)
            if(objIndex >= 0) { // another courses
              courseThemes[objIndex].options.push(option)
            } else {
              const theme = {
                value: el.courseId,
                label: el.courseName,
                options: [ option ]
              }
              courseThemes.push(theme)
            }
          })
          state.courseThemes = courseThemes
        } else { // didn't select any course
          const options = state.themes.find(t => t.value === course.value).options
          state.courseThemes = options
        }
      } else {
        state.courseThemes = state.themes
      }
    },
    //
    /*setThemes(state, themes) {
      state.themes = themes
    },*/
    selectTheme(state, theme) {
      state.selectedTheme = theme
    },
    setSingleMode(state, mode) {
      state.singleMode = mode
    },
    groupThemes(state, groupped) {
      state.isGrouppedThemes = groupped
    },
    disableThemes(state, disabled) {
      state.isDisabledTheme = disabled
    },
    disableGroups(state, disabled) {
      state.isDisabledGroups = disabled
    },
    setCourseThemes(state, themes) {
      state.courseThemes = themes
    },
    //
    setRegions(state, regions) {
      state.regions = regions
    },
    selectRegion(state, region) {
      state.selectedRegion = region
      // restrict settlements
      /* if you want group settlements change prop :groups="true"
      const regionSettelements = state.settlements.find(t => t.value === region.value)
      if(regionSettelements) {
        if(typeof regionSettelements === 'object')
          state.regionSettlements = [ regionSettelements ]
        else
          state.regionSettlements = regionSettelements
      } else
        state.regionSettlements = [ {value: region.value, label: region.label, options: [] } ]
      */
      state.regionSettlements = state.settlements.filter(s => s.regionId === region.value)
      // restrict volunteers
      /*const regionVolunteers = state.volunteers.find(t => t.value === region.value)
      if(!regionVolunteers) {
        state.regionVolunteers = [ {value: region.value, label: region.label, options: [] } ]
      }
      else {
        if(typeof regionVolunteers === 'object')
          state.regionVolunteers = [ regionVolunteers ]
        else
          state.regionVolunteers = regionVolunteers
      }*/
      state.regionVolunteers = state.volunteers.filter(t => t.regionId === region.value)
      // restrict institutions
      /*const regionInstitutions = state.institutions.find(t => t.value === region.value)
      if(!regionInstitutions) {
        state.regionInstitutions = [ {value: region.value, label: region.label, options: [] } ]
      }
      else {
        if(typeof regionInstitutions === 'object')
          state.regionInstitutions = [ regionInstitutions ]
        else
          state.regionInstitutions = regionInstitutions
      }*/
      state.regionInstitutions = state.institutions.filter(t => t.regionId === region.value)
      /*if(typeof regionInstitutions === 'object')
          state.regionInstitutions = [ regionInstitutions ]
        else
          state.regionInstitutions = regionInstitutions*/
    },
    //
    setVolunteers(state, volunteers) {
      state.volunteers = volunteers
    },
    setNewGroup(state, newGroup) {
      state.newGroup = newGroup
    },
    setNewTheme(state, newTheme) {
      state.newTheme = newTheme
    },
    setNewSettlement(state, newSettlement) {
      state.newSettlement = newSettlement
    },
    setNewInstitution(state, newInstitution) {
      state.newInstitution = newInstitution
    },
    selectVolunteers(state, volunteers) {
      state.selectedVolunteers = volunteers
    },
    setRegionVolunteers(state, volunteers) {
      state.regionVolunteers = volunteers
    },
    //
    setSettlements(state, settlements) {
      state.settlements = settlements
    },
    selectSettlement(state, settlement) {
      state.selectedSettlement = settlement
      if(settlement && settlement.value) {
        state.regionVolunteers = state.volunteers.filter(t => t.settlementId === settlement.value)
        state.regionInstitutions = state.institutions.filter(t => t.settlementId === settlement.value)
      } else {
        state.regionVolunteers = state.volunteers
        state.regionInstitutions = state.institutions
      }
    },
    setRegionSettlements(state, settlements) {
      state.regionSettlements = settlements
    },
    //
    setInstitutions(state, institutions) {
      state.institutions = institutions
    },
    setRegionInstitutions(state, institutions) {
      state.regionInstitutions = institutions
    },
    selectInstitution(state, institution) {
      state.selectedInstitution = institution
      state.institutionGroups = state.groups.filter(t => t.institutionId === institution.value)
    },
    clearInstitution(state) {
      state.selectedGroups = []
      state.institutionGroups = []
      state.selectedInstitution = {}
    },
    //
    setGroups(state, groups) {
      state.groups = groups
    },
    selectGroups(state, groups) {
      state.selectedGroups = groups
    },
    setInstitutionGroups(state, groups) {
      state.institutionGroups = groups
    },
    //
    async sendReport(state) {
      if(!state.selectedRegion) {
        state.isReported = false
        toast.warning('Выберите регион', {timeout: 6000})
        return false
      }
      if(!state.selectedSettlement) {
        state.isReported = false
        toast.warning('Выберите населенный пункт', {timeout: 6000})
        return false
      }
      if(!state.selectedInstitution) {
        state.isReported = false
        toast.warning('Выберите образовательное учреждение', {timeout: 6000})
        return false
      }
      if(!state.selectedVolunteers) {
        state.isReported = false
        toast.warning('Выберите волонтеров', {timeout: 6000})
        return false
      }
      if(!state.selectedGroups) {
        state.isReported = false
        toast.warning('Выберите учащуюся группу', {timeout: 6000})
        return false
      }
      if(!state.selectedTheme) {
        state.isReported = false
        toast.warning('Выберите тему', {timeout: 6000})
        return false
      }
      if(!state.selectedNumber) {
        state.isReported = false
        toast.warning('Выберите количество слушателей', {timeout: 6000})
        return false
      }

      if(state.selectedImages && state.selectedImages.length > 0) {
        let formData = new FormData();
        state.selectedImages.map(img => formData.append('images[]',img));
        const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.post(process.env.VUE_APP_API_URL + '/upload.php', formData, headers)
        .then(res => {
          toast.success("Фото успешно загружены", {timeout: 3000})
          //toast.success(res.data, {timeout: 6000})
          state.message = res.data
        }).catch(err => {
          console.log(err)
          toast.error('Фото не удалось загрузить ' + err, {timeout: 8000})
          state.message = '' + err
        });
      }

      const report = {
        userId: state.userId,
        username: state.username,
        eventDate: state.selectedDate,
        regionId: parseInt(state.selectedRegion.value),
        regionName: state.selectedRegion.label,
        settlementId: parseInt(state.selectedSettlement.value),
        settlementName: state.selectedSettlement.label,
        institutionId: parseInt(state.selectedInstitution.value),
        institutionName: state.selectedInstitution.label,
        volunteerIds: state.selectedVolunteers.reduce((res, item) => res + item.value + '|','').slice(0, -1),
        volunteerNames: state.selectedVolunteers.reduce((res, item) => res + item.label + '|','').slice(0, -1),
        groupIds: state.selectedGroups.reduce((res, item) => res + item.value + '|','').slice(0, -1),
        groupNames: state.selectedGroups.reduce((res, item) => res + item.label + '|','').slice(0, -1),
        themeId: parseInt(state.selectedTheme.value),
        themeName: state.selectedTheme.label || '',
        stageId: state.selectedStage.id,
        stageName: state.selectedStage.text,
        number: state.selectedNumber,
        hoursId: state.selectedHours.id,
        hoursName: state.selectedHours.text,
        images: state.selectedImages.reduce((res, item) => res + item.name + '|','').slice(0, -1),
        comment: state.comment
      }
      // transform object to php format
      const formData = new FormData();
      for(var key in report)
        formData.append(key, report[key]);
        const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
      await axios.post(process.env.VUE_APP_API_URL + '/reports.php', formData, headers)
      .then(res => {
        if(res.data) {
          if(res.data.status == 'success') {
            toast.success(res.data.message, {timeout: 6000})
            state.isReported = true
            state.selectedGroups = []
            state.selectedImages = []
            state.selectedNumber = ''
            state.selectedTheme = {}
            router.push('/')
          } else if(res.data.status == 'warn') {
            toast.warning(res.data.message, {timeout: 6000})
          } else if(res.data.status == 'error') {
            toast.error(res.data.message, {timeout: 6000})
          }
        } else
          toast.error('Unknown error: ' + res, {timeout: 10000})
        state.message = res.data
        state.isReported = false

      }).catch(err => {
        toast.error('' + err, {timeout: 8000})
        console.log(err)
        state.message = '' + err
        state.isReported = false
      })
    },
    async inputFormData(state) {
      let formData = new FormData();
      state.selectedImages.map(img => formData.append('images[]',img));
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
      await axios.post(process.env.VUE_APP_API_URL + '/upload.php', formData, headers)
      .then(res => {
        toast.success(res.data, {timeout: 6000})
        state.selectedImages = []
        state.message = res.data
      }).catch(err => {
        console.log(err)
        toast.error('Can not upload image ' + err, {timeout: 8000})
        state.message = '' + err
      });
    },
    async login(state) {
      const credentials = {
        username: state.username,
        password: state.password
      }
      const formData = new FormData();
      for(var key in credentials)
      formData.append(key, credentials[key]);
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.post(process.env.VUE_APP_API_URL + '/auth.php', formData, headers)
        .then(res => {
          state.jwt = res.data
          this.$router.push('/')
        }).catch(err => {
          console.log(err)
          toast.error('' + err, {timeout: 8000})
        });
    },
  },
  actions: {
    loadData({state, dispatch }) {
      dispatch('fetchCourses')
      dispatch('fetchThemes')
      dispatch('fetchRegions')
      dispatch('fetchSettlements')
      dispatch('fetchVolunteers')
      dispatch('fetchInstitutions')
      dispatch('fetchGroups')
      state.isLoadedData = true
    },
    async createInstitution({state}) {
      const formData = new FormData();
      for(var key in state.newInstitution)
      formData.append(key, state.newInstitution[key]);
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
      return await axios.post(process.env.VUE_APP_API_URL + '/institutions.php', formData, headers)
      .then(res => {
        if(res.data) {
          if(res.data.id) {
            state.newInstitution = {
              label: res.data.name,
              value: res.data.id
            }
            state.institutions.push(state.newInstitution)
            toast.info("Создано новое учреждение успешно")
            return state.newInstitution
          }
          else
            toast.warn(res.data.message)
        }
      }).catch(err => {
        toast.error('Can not create institution ' + err, {timeout: 8000})
      });
    },
    async createSettlement({state}) {
      const formData = new FormData();
      for(var key in state.newSettlement)
      formData.append(key, state.newSettlement[key]);
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
      return await axios.post(process.env.VUE_APP_API_URL + '/settlements.php', formData, headers)
      .then(res => {
        if(res.data) {
          if(res.data.id) {
            state.newSettlement = {
              label: res.data.name,
              value: res.data.id
            }
            state.settlements.push(state.newSettlement)
            toast.info("Создан новый населенный пункт")
            return state.newSettlement
          }
          else
            toast.warn(res.data.message)
        }
      }).catch(err => {
        toast.error('Can not create settlement ' + err, {timeout: 8000})
      });
    },
    async createGroup({state}) {
      const formData = new FormData();
      for(var key in state.newGroup)
      formData.append(key, state.newGroup[key]);
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
      return await axios.post(process.env.VUE_APP_API_URL + '/groups.php', formData, headers)
      .then(res => {
        if(res.data) {
          if(res.data.id) {
            state.newGroup = {
              regionId: res.data.regionId,
              settlementId: res.data.settlementId,
              institutionId: res.data.institutionId,
              institutionName: res.data.institutionName,
              label: res.data.name,
              value: res.data.id
            }
            state.groups.push(state.newGroup)
            toast.info("Создана новая группа")
            return state.newGroup
          }
          else
            toast.warn(res.data.message)
        }
      }).catch(err => {
        toast.error('Can not create group ' + err, {timeout: 8000})
      });
    },
    async createTheme({state}) {
      const formData = new FormData();
      for(var key in state.newTheme)
      formData.append(key, state.newTheme[key]);
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
      return await axios.post(process.env.VUE_APP_API_URL + '/themes.php', formData, headers)
      .then(res => {
        if(res.data) {
          if(res.data.id) {
            state.newTheme = {
              courseId: res.data.courseId,
              courseName: res.data.courseName,
              label: res.data.orderId + ". " + res.data.name,
              value: res.data.id
            }
            state.themes[2].options.push(state.newTheme)
            toast.info("Создана новая тема")
            return state.newTheme
          }
          else
            toast.warn(res.data.message)
        }
      }).catch(err => {
        toast.error('Can not create theme ' + err, {timeout: 8000})
      });
    },
    async fetchCourses({state}) {
        const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.get(process.env.VUE_APP_API_URL + '/courses.php', headers)
        .then(res => {
          state.courses = res.data.map(({id, name, ...rest}) => ({...rest, value: id, label: name}));
          state.rootCourses = state.courses.filter(t => t.parentId === '0')
        }).catch(err => {
          toast.error('Can not fetch courses ' + err, {timeout: 8000})
        });
    },
    async fetchThemes({state}) {
        const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.get(process.env.VUE_APP_API_URL + '/themes.php', headers)
        .then(res => {
          const themes = res.data.map(({id, name, ...rest}) => ({value: id, label: name, ...rest}))
          let modifiedThemes = []
          themes.forEach((el) => {
            const option = {
              value: el.value,
              label: el.orderId + '. '+ el.label,
              courseId: el.courseId,
              courseName: el.courseName
            }
            const objIndex = modifiedThemes.findIndex(t => el.courseParentId == 0 && t.value === el.courseId || el.courseParentId != 0 && t.value === el.courseParentId)
            if(objIndex > -1) {
              modifiedThemes[objIndex].options.push(option)
            } else {
              const theme = {
                value: el.courseParentId == '0' ? el.courseId : el.courseParentId,
                label: el.courseParentId == '0' ? el.courseName : el.courseParentName,
                options: [ option ]
              }
              modifiedThemes.push(theme)
            }
          })
          state.themes = modifiedThemes
          //state.courseThemes = modifiedThemes
        }).catch(err => {
          console.log(err)
          toast.error('Can not fetch themes ' + err, {timeout: 8000})
        });
    },
    async fetchRegions({state}) {
        const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.get(process.env.VUE_APP_API_URL + '/regions.php', headers)
        .then(res => {
          state.regions = res.data.map(({id, name, ...rest}) => ({...rest, value: id, label: name}));
        }).catch(err => {
          toast.error('Can not fetch regions ' + err, {timeout: 8000})
        });
    },
    async fetchSettlements({state}) {
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.get(process.env.VUE_APP_API_URL + '/settlements.php', headers)
        .then(res => {
          state.settlements = res.data.map(({id, name, ...rest}) => ({value: id, label: name, ...rest}))
          /* if you want group settlements chage prop :groups="false"
          let settlements = []
          res.data.forEach((el) => {
            const objIndex = settlements.findIndex(t => t.value === el.regionId)
            // change prop :groups="true"  
            const option = {value: el.id, label: el.name}
            if(objIndex >= 0) {
              settlements[objIndex].options.push(option)
            } else {
              const settlement = {
                value: el.regionId,
                label: el.regionName,
                options: [option]
              }
              settlements.push(settlement)
            }
          })*/
          if(state.selectedRegion && state.selectedRegion.value)
            state.regionSettlements = state.settlements.filter(t => t.regionId === state.selectedRegion.value)
          else
            state.regionSettlements = []
        }).catch(err => {
          toast.error('Can not fetch settlements ' + err, {timeout: 8000})
        });
    },
    async fetchVolunteers({state}) {
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.get(process.env.VUE_APP_API_URL + '/volunteers.php', headers)
        .then(res => {
          state.volunteers = res.data.map(({id, lastname, firstname, middlename, ...rest}) => ({value: id, label: lastname + ' ' + firstname + ' ' + middlename, ...rest}))
          if(state.selectedSettlement && state.selectedSettlement.value)
            state.regionVolunteers = state.volunteers.filter(t => t.settlementId === state.selectedSettlement.value)
          else
            state.regionVolunteers = []
        }).catch(err => {
          toast.error('Can not fetch volunteers ' + err, {timeout: 8000})
        });
    },
    async fetchInstitutions({state}) {
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.get(process.env.VUE_APP_API_URL + '/institutions.php', headers)
        .then(res => {
          state.institutions = res.data.map(({id, name, ...rest}) => ({value: id, label: name, ...rest}))
          if(state.selectedSettlement && state.selectedSettlement.value)
            state.regionInstitutions = state.institutions.filter(t => t.settlementId === state.selectedSettlement.value)
          else
          state.regionInstitutions = []
        }).catch(err => {
          toast.error('Can not fetch institutions ' + err, {timeout: 8000})
        });
    },
    async fetchGroups({state}) {
      const headers = { headers: { Authorization: 'Bearer ' + state.jwt } }
        await axios.get(process.env.VUE_APP_API_URL + '/groups.php', headers)
        .then(res => {
          state.groups = res.data.map(({id, name, ...rest}) => ({value: id, label: name, ...rest}))
          if(state.selectedInstitution && state.selectedInstitution.value)
            state.institutionGroups = state.groups.filter(t => t.institutionId === state.selectedInstitution.value)
          else
            state.institutionGroups = []
        }).catch(err => {
          toast.error('Can not fetch groups ' + err, {timeout: 8000})
        });
    }
  },
  namespaced: true
}
