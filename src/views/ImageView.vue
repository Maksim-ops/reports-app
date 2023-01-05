<template>
  <div class="images">
    <h2>Выберите фотографии</h2>
    <vue-multi-image-upload
      :selectedImages="$store.state.report.selectedImages"
      @dataImage="selectImage"
      :max="4"
      :image-size="imageSize"
      :image-format="formatType"
    />
    <!-- <button @click="inputFormData">ЗАГРУЗИТЬ</button> -->
    <NavButtons 
      :routes="[ '/hours', '/review' ]"
      :text="[ 'НАЗАД', 'ДАЛЕЕ' ]"
    />
  </div>
  </template>

<style>
  
</style>
  
<script>
  import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';

  export default {
    name: 'ImageView',
    components: {
      VueMultiImageUpload
    },
    data(){
        return {
          imageSize : 10000000, // 10MB
          formatType : ['image/jpeg', 'image/png', 'image/jpg']
        }
    },
    methods:{
      selectImage(e){
        e.map(res=>console.log(res))
        this.$store.commit('report/selectImages', e)
      },
      clear(){
        this.component.clear = true;
      },
      inputFormData(){
        this.$store.commit('report/inputFormData')
      }
    },
  }
  </script>