<template>
  <div class="images">

    <div class="upload" v-show="!isOption">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Thumb</th>
              <th>Name</th>
              <th>Width</th>
              <th>Height</th>
              <th>Size</th>
              <th>Speed</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!files.length">
              <td colspan="9">
                <div class="text-center p-5">
                  <h4>Drop files anywhere to upload<br/>or</h4>
                  <label :for="name" class="btn btn-lg btn-primary">Select Files</label>
                </div>
              </td>
            </tr>
            <tr v-for="(file, index) in files" :key="file.id">
              <td>{{index}}</td>
              <td>
                <img class="td-image-thumb" v-if="file.thumb" :src="file.thumb" />
                <span v-else>No Image</span>
              </td>
              <td>
                <div class="filename">
                  {{file.name}}
                </div>
                <div class="progress" v-if="file.active || file.progress !== '0.00'">
                  <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}" role="progressbar" :style="{width: file.progress + '%'}">{{file.progress}}%</div>
                </div>
              </td>
              <td>{{file.width || 0}}</td>
              <td>{{file.height || 0}}</td>
              
  
              <td v-if="file.error">{{file.error}}</td>
              <td v-else-if="file.success">success</td>
              <td v-else-if="file.active">active</td>
              <td v-else></td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button">
                    Action
                  </button>
                  <div class="dropdown-menu">
                    <a :class="{'dropdown-item': true, disabled: file.active || file.success || file.error === 'compressing' || file.error === 'image parsing'}" href="#" @click.prevent="file.active || file.success || file.error === 'compressing' ? false :  onEditFileShow(file)">Edit</a>
                    <a :class="{'dropdown-item': true, disabled: !file.active}" href="#" @click.prevent="file.active ? $refs.upload.update(file, {error: 'cancel'}) : false">Cancel</a>
  
                    <a class="dropdown-item" href="#" v-if="file.active" @click.prevent="$refs.upload.update(file, {active: false})">Abort</a>
                    <a class="dropdown-item" href="#" v-else-if="file.error && file.error !== 'compressing' && file.error !== 'image parsing' && $refs.upload.features.html5" @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})">Retry upload</a>
                    <a :class="{'dropdown-item': true, disabled: file.success || file.error === 'compressing' || file.error === 'image parsing'}" href="#" v-else @click.prevent="file.success || file.error === 'compressing' || file.error === 'image parsing' ? false : $refs.upload.update(file, {active: true})">Upload</a>
  
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click.prevent="$refs.upload.remove(file)">Remove</a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="example-foorer">
        <div class="footer-status float-right">
          Drop: {{$refs.upload ? $refs.upload.drop : false}},
          Active: {{$refs.upload ? $refs.upload.active : false}},
          Uploaded: {{$refs.upload ? $refs.upload.uploaded : true}},
          Drop active: {{$refs.upload ? $refs.upload.dropActive : false}}
        </div>
        <div class="btn-group">
          <file-upload
            class="btn btn-primary dropdown-toggle"
            :post-action="postAction"
            :put-action="putAction"
            :extensions="extensions"
            :accept="accept"
            :multiple="multiple"
            :directory="directory"
            :create-directory="createDirectory"
            :size="size || 0"
            :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
            :headers="headers"
            :data="data"
            :drop="drop"
            :drop-directory="dropDirectory"
            :add-index="addIndex"
            v-model="files"
            @input-filter="inputFilter"
            @input-file="inputFile"
            ref="upload">
            <i class="fa fa-plus"></i>
            Select
          </file-upload>
          <div class="dropdown-menu">
            <label class="dropdown-item" :for="name">Add files</label>
            <a class="dropdown-item" href="#" @click="onAddFolder">Add folder</a>
            <a class="dropdown-item" href="#" @click.prevent="addData.show = true">Add data</a>
          </div>
        </div>
        <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
        <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
      </div>
    </div>
  
  
  
  </div>
  </template>
  <style>
  .example-full .btn-group .dropdown-menu {
    display: block;
    visibility: hidden;
    transition: all .2s
  }
  .example-full .btn-group:hover > .dropdown-menu {
    visibility: visible;
  }
  .example-full label.dropdown-item {
    margin-bottom: 0;
  }
  .example-full .btn-group .dropdown-toggle {
    margin-right: .6rem
  }
  .td-image-thumb {
    max-width: 4em;
    max-height: 4em;
  }
  .example-full .filename {
    margin-bottom: .3rem
  }
  .example-full .btn-is-option {
    margin-top: 0.25rem;
  }
  .example-full .example-foorer {
    padding: .5rem 0;
    border-top: 1px solid #e9ecef;
    border-bottom: 1px solid #e9ecef;
  }
  .example-full .edit-image img {
    max-width: 100%;
  }
  .example-full .edit-image-tool {
    margin-top: .6rem;
  }
  .example-full .edit-image-tool .btn-group{
    margin-right: .6rem;
  }
  .example-full .footer-status {
    padding-top: .4rem;
  }
  .example-full .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .6;
    text-align: center;
    background: #000;
  }
  .example-full .drop-active h3 {
    margin: -.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }
  </style>
  
  <script>
  import Cropper from 'cropperjs'
  import ImageCompressor from '@xkeshi/image-compressor'
  import FileUpload from 'vue-upload-component'
  export default {
    name: 'ImageView',
    components: {
      FileUpload,
    },
    data() {
      return {
        files: [],
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        extensions: 'gif,jpg,jpeg,png,webp',
        // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
        // extensions: /\.(gif|jpe?g|png|webp)$/i,
        minSize: 1024,
        size: 1024 * 1024 * 10,
        multiple: true,
        directory: false,
        drop: true,
        dropDirectory: true,
        createDirectory: false,
        addIndex: false,
        thread: 3,
        name: 'file',
        postAction: '/upload/post',
        putAction: '/upload/put',
        headers: {
          'X-Csrf-Token': 'xxxx',
        },
        data: {
          '_csrf_token': 'xxxxxx',
        },
        autoCompress: 1024 * 1024,
        uploadAuto: false,
        isOption: false,
        addData: {
          show: false,
          name: '',
          type: '',
          content: '',
        },
        editFile: {
          show: false,
          name: '',
        }
      }
    },
    watch: {
      'editFile.show'(newValue, oldValue) {
        // ????????? ???????????? error
        if (!newValue && oldValue) {
          this.$refs.upload.update(this.editFile.id, { error: this.editFile.error || '' })
        }
        if (newValue) {
          this.$nextTick( () => {
            if (!this.$refs.editImage) {
              return
            }
            let cropper = new Cropper(this.$refs.editImage, {
              autoCrop: false,
            })
            this.editFile = {
              ...this.editFile,
              cropper
            }
          })
        }
      },
      'addData.show'(show) {
        if (show) {
          this.addData.name = ''
          this.addData.type = ''
          this.addData.content = ''
        }
      },
    },
    methods: {
      inputFilter(newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          // Before adding a file
          // ???????????????
          // Filter system files or hide files
          // ?????????????????? ???????????????
          if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            return prevent()
          }
          // Filter php html js file
          // ?????? php html js ??????
          if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
          }
          // Automatic compression
          // ????????????
          if (newFile.file && newFile.error === "" && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
            newFile.error = 'compressing'
            const imageCompressor = new ImageCompressor(null, {
              convertSize: 1024 * 1024,
              maxWidth: 512,
              maxHeight: 512,
            })
            imageCompressor.compress(newFile.file)
              .then((file) => {
                this.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type })
              })
              .catch((err) => {
                this.$refs.upload.update(newFile, { error: err.message || 'compress' })
              })
          }
        }
        if (newFile && newFile.error === "" && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
          // Create a blob field
          // ?????? blob ??????
          newFile.blob = ''
          let URL = (window.URL || window.webkitURL)
          if (URL) {
            newFile.blob = URL.createObjectURL(newFile.file)
          }
          // Thumbnails
          // ?????????
          newFile.thumb = ''
          if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
            newFile.thumb = newFile.blob
          }
        }
        // image size
        // image ??????
        if (newFile && newFile.error === '' && newFile.type.substr(0, 6) === "image/" && newFile.blob && (!oldFile || newFile.blob !== oldFile.blob)) {
          newFile.error = 'image parsing'
          let img = new Image();
          img.onload = () => {
            this.$refs.upload.update(newFile, {error: '', height: img.height, width: img.width})
          } 
          /*img.??nerr??r = (e) => {
            this.$refs.upload.update(newFile, { error: 'parsing image size'}) 
          }*/
          console.log('??nerr??r')
          img.src = newFile.blob
        }
      },
      // add, update, remove File Event
      inputFile(newFile, oldFile) {
        if (newFile && oldFile) {
          // update
          if (newFile.active && !oldFile.active) {
            // beforeSend
            // min size
            if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
              this.$refs.upload.update(newFile, { error: 'size' })
            }
          }
          if (newFile.progress !== oldFile.progress) {
            // progress
          }
          if (newFile.error && !oldFile.error) {
            // error
          }
          if (newFile.success && !oldFile.success) {
            // success
          }
        }
        if (!newFile && oldFile) {
          // remove
          if (oldFile.success && oldFile.response.id) {
            // $.ajax({
            //   type: 'DELETE',
            //   url: '/upload/delete?id=' + oldFile.response.id,
            // })
          }
        }
        // Automatically activate upload
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (this.uploadAuto && !this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
        }
      },
      alert(message) {
        alert(message)
      },
      onEditFileShow(file) {
        this.editFile = { ...file, show: true }
        this.$refs.upload.update(file, { error: 'edit' })
      },
      onEditorFile() {
        if (!this.$refs.upload.features.html5) {
          this.alert('Your browser does not support')
          this.editFile.show = false
          return
        }
        let data = {
          name: this.editFile.name,
          error: '',
        }
        if (this.editFile.cropper) {
          let binStr = atob(this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1])
          let arr = new Uint8Array(binStr.length)
          for (let i = 0; i < binStr.length; i++) {
            arr[i] = binStr.charCodeAt(i)
          }
          data.file = new File([arr], data.name, { type: this.editFile.type })
          data.size = data.file.size
        }
        this.$refs.upload.update(this.editFile.id, data)
        this.editFile.error = ''
        this.editFile.show = false
      },
      // add folder
      onAddFolder() {
        if (!this.$refs.upload.features.directory) {
          this.alert('Your browser does not support')
          return
        }
        let input = document.createElement('input')
        input.style = "background: rgba(255, 255, 255, 0);overflow: hidden;position: fixed;width: 1px;height: 1px;z-index: -1;opacity: 0;"
        input.type = 'file'
        input.setAttribute('allowdirs', true)
        input.setAttribute('directory', true)
        input.setAttribute('webkitdirectory', true)
        input.multiple = true
        document.querySelector("body").appendChild(input)
        input.click()
        console.log('onchange')
        /*input.onchange = (e) => {
          this.$refs.upload.addInputFile(input).then(function() {
            document.querySelector("body").removeChild(input)
          })
        }*/
      },
      onAddData() {
        this.addData.show = false
        if (!this.$refs.upload.features.html5) {
          this.alert('Your browser does not support')
          return
        }
        let file = new window.File([this.addData.content], this.addData.name, {
          type: this.addData.type,
        })
        this.$refs.upload.add(file)
      }
    }
  }
  </script>