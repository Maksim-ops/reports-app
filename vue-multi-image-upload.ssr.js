'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
  name: "VueMultiImageUpload",
  data: function data() {
    return {
      local: {
        max: 'Maximum',
        select: 'Selected',
        ready: 'Ready'
      },
      inputImages: [],
      imagesLivePreview: [],
      selectFile: null,
      dataClear: {
        clear: false
      },
      img: 'data:image/png;base64,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'
    };
  },
  emits: ['dataImage'],
  props: {
    selectedImages: {
      type: Array,
      default: () => [],
      required: true,
    },
    max: {
      type: Number,
      default: 6
    },
    imageFormat: {
      type: Array,
      default: ['image/jpeg', 'image/png', 'image/jpg']
    },
    imageSize: {
      type: Number,
      default: 4000000
    },
    dataReset: Object,
    options: Object
  },
  methods: {
    loadImagePreview: function loadImagePreview() {
      var _this = this;

      var vm = this;

      if (this.imagesLivePreview.length > 0) {
        var _loop = function _loop(i) {
          var e = new FileReader();
          e.onload = function () {
            return vm.$refs["image".concat(vm.imagesLivePreview[i].name)][0].src = e.result;
          }, e.readAsDataURL(_this.imagesLivePreview[i]);
        };

        for (var i = 0; i < this.imagesLivePreview.length; i++) {
          _loop(i);
        }
      }
    },
    removeImgPreview: function removeImgPreview(e) {
      var item = this.inputImages.find(function (i) {
        return i.name == e;
      });
      this.imagesLivePreview.remove(item), this.inputImages.remove(item);
      this.$emit('dataImage', this.imagesLivePreview);
    },
    imageValidation: function imageValidation(container, maxsize) {
      var _this2 = this;

      if (this.inputImages.length == 0) {
        if (parseInt(container.length) > this.max) {
          alert("The maximun number of photo limit is " + this.max);
          var i = [];

          for (var t = 0; t < this.max; t++) {
            i.push(container[t]);
          }

          container = i;
        }
      } else {
        var sameFile = this.inputImages.filter(function (e) {
          for (var n = 0; n < container.length; n++) {
            if (e.name == container[n].name) return !0;
          }

          return null;
        });
        if (sameFile.length > 0) for (var _i = 0; _i < sameFile.length; _i++) {
          this.inputImages.remove(sameFile[_i]);
        }
        var ilength = this.inputImages.length,
            totalFile = container.length + ilength;

        if (totalFile > this.max) {
          var _t = [],
              e = this.max - ilength;

          for (var l = 0; l < e; l++) {
            _t.push(container[l]);
          }

          alert("The maximun number of photo limit is " + this.max), container = _t;
        }
      }

      var imagesTypeInvalid = container.filter(function (e) {
        return !_this2.imageFormat.includes(e.type);
      });
      var imagesSize = container.filter(function (e) {
        if (e.size >= maxsize) return !0;
      });

      if (imagesSize.length >= 1) {
        alert("".concat(imagesSize[0].name, " file size in too much.We will remove all of these file."));

        for (var _e = 0; _e < imagesSize.length; _e++) {
          container.remove(imagesSize[_e]);
        }
      }

      if (imagesTypeInvalid.length > 0) {
        for (var _i2 = 0; _i2 < imagesTypeInvalid.length; _i2++) {
          container.remove(imagesTypeInvalid[_i2]);
        }

        return container;
      }

      return container;
    },
    imageDetect: function imageDetect(e) {
      var _this3 = this;

      if (window.File && window.FileList && window.FileReader) {
        if (0 == this.inputImages.length) {
          var i = e.target.files || e.dataTransfer.files;
          i = Array.prototype.slice.call(i), this.inputImages = this.imageValidation(i, this.imageSize), this.inputImages.map(function (i) {
            return _this3.imagesLivePreview.push(i);
          });
        } else {
          var t = e.target.files || e.dataTransfer.files;
          t = Array.prototype.slice.call(t), (t = this.imageValidation(t, this.imageSize)).filter(function (i) {
            return _this3.inputImages.push(i);
          }), this.imagesLivePreview = this.inputImages;
        }
        this.$emit('dataImage', this.imagesLivePreview);
      } else console.log("Your browser is not supports files format.");
    },
    clearProperty: function clearProperty() {
      this.dataClear.clear && (this.inputImages = [], this.imagesLivePreview = [], this.selectFile = "", this.dataClear.clear = !1);
    }
  },
  created: function created() {
    if (this.dataReset) this.dataClear = this.dataReset;

    if(this.selectedImages && this.selectedImages.length > 0) {
      this.imagesLivePreview = this.selectedImages
      this.inputImages = this.selectedImages
    }
  
    Array.prototype.remove = function () {
      for (var t, e, i = arguments, r = i.length; r && this.length;) {
        for (t = i[--r]; -1 !== (e = this.indexOf(t));) {
          this.splice(e, 1);
        }
      }
      return this;
    };
  },
};var _withScopeId = function _withScopeId(n) {
  return vue.pushScopeId("data-v-b483f8e0"), n = n(), vue.popScopeId(), n;
};

var _hoisted_1 = {
  class: "file-upload"
};
var _hoisted_2 = {
  class: "file-select"
};
var _hoisted_3 = {
  class: "file-select-button"
};
var _hoisted_4 = ["src"];
var _hoisted_5 = {
  key: 0,
  class: "file-ready"
};
var _hoisted_6 = {
  key: 1,
  style: {
    "font-size": "15px",
    "padding-left": "10px",
    "color": "#555"
  }
};
var _hoisted_7 = {
  key: 0
};
var _hoisted_8 = {
  key: 1
};
var _hoisted_9 = {
  key: 2,
  style: {
    "letter-spacing": "2px",
    "color": "#777",
    "padding-left": "7px"
  }
};

var _hoisted_10 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/vue.createElementVNode("input", {
    type: "file",
    accept: "image/*",
    multiple: ""
  }, null, -1);
});

var _hoisted_11 = [_hoisted_10];
var _hoisted_12 = ["onload"];
var _hoisted_13 = ["load"];
var _hoisted_14 = {
  class: "imghover"
};
var _hoisted_15 = ["title", "onClick", "alt"];
var _hoisted_16 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$props$max;

  return vue.openBlock(), vue.createElementBlock("div", null, [vue.createElementVNode("div", _hoisted_1, [vue.createElementVNode("div", _hoisted_2, [vue.createElementVNode("div", _hoisted_3, [vue.createElementVNode("img", {
    class: "file-image",
    src: $data.img
  }, null, 8, _hoisted_4)]), $data.inputImages.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, vue.toDisplayString($data.inputImages.length ? $props.options && $props.options.ready ? $props.options.ready : $data.local.ready : " "), 1)) : vue.createCommentVNode("", true), $data.inputImages.length >= 1 ? (vue.openBlock(), vue.createElementBlock("b", _hoisted_6, [vue.createTextVNode(vue.toDisplayString($data.inputImages.length) + " ", 1), $data.inputImages.length == 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, "file")) : vue.createCommentVNode("", true), $data.inputImages.length > 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8, "files")) : vue.createCommentVNode("", true), vue.createTextVNode(" " + vue.toDisplayString($props.options && $props.options.select ? $props.options.select : $data.local.select) + ". ", 1)])) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_9, vue.toDisplayString($props.options && $props.options.max ? $props.options.max : $data.local.max) + " " + vue.toDisplayString((_$props$max = $props.max) !== null && _$props$max !== void 0 ? _$props$max : ' . . .'), 1)), vue.createElementVNode("div", {
    onChange: _cache[0] || (_cache[0] = function () {
      return $options.imageDetect && $options.imageDetect.apply($options, arguments);
    })
  }, _hoisted_11, 32)])]), vue.createElementVNode("div", {
    onload: $options.clearProperty()
  }, null, 8, _hoisted_12), vue.createElementVNode("div", {
    class: "rowc",
    load: $options.loadImagePreview()
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.imagesLivePreview, function (img, key) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "colc-4",
      style: {
        "padding": "10px 2px",
        "margin-top": "20px"
      },
      key: key
    }, [vue.createElementVNode("div", _hoisted_14, [vue.createElementVNode("img", {
      title: 'remove-' + img.name,
      onClick: function onClick($event) {
        return $options.removeImgPreview(img.name);
      },
      ref_for: true,
      ref: 'image' + img.name,
      alt: img.name,
      class: "imgPreview"
    }, null, 8, _hoisted_15), vue.createElementVNode("i", {
      onClick: function onClick($event) {
        return $options.removeImgPreview(img.name);
      },
      class: "delIcon"
    }, "ⓧ", 8, _hoisted_16)])]);
  }), 128))], 8, _hoisted_13)]);
}function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = "\n.colc-4[data-v-b483f8e0] {\n  width: 33.33%;\n}\n*[data-v-b483f8e0] {\n  box-sizing: border-box;\n}\n.rowc[data-v-b483f8e0] {\n  display: table;\n  border-radius: 5px;\n  padding-top: 5px;\n}\n@media only screen and (max-width: 476px) {\n  /* For mobile phones: */\n[class*=\"colc-\"][data-v-b483f8e0] {\n    display: inline;\n    width: 33.33%;\n}\n}\n@media only screen and (min-width: 476px) and (max-width: 768px) {\n  /* For mobile phones: */\n[class*=\"colc-\"][data-v-b483f8e0] {\n    display: inline;\n    width: 25%;\n}\n}\n@media only screen and (min-width: 769px) {\n  /* For mobile phones: */\n[class*=\"colc-\"][data-v-b483f8e0] {\n    display: inline;\n    width: 20%;\n}\n}\n.imgPreview[data-v-b483f8e0] {\n  height: 110px;\n  cursor: pointer;\n  width: 105px;\n}\n.imghover[data-v-b483f8e0] {\n  border: 2px solid #dfd4d4;\n  position: relative;\n  display: inline-block;\n}\n.imghover[data-v-b483f8e0]:hover {\n  box-shadow: 2px 2px 5px #4594e4;\n  transition: all 0.2s ease-in-out;\n  -moz-transition: all 0.2s ease-in-out;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n}\n.file-upload[data-v-b483f8e0] {\n  display: block;\n  text-align: center;\n  font-family: sans-serif;\n  font-size: 14px;\n  position: relative;\n}\n.file-select[data-v-b483f8e0] {\n  display: flex;\n  align-items: center;\n  border: 2px solid #dce4ec;\n  color: #243342;\n  cursor: pointer;\n  height: 40px;\n  border-radius: 8px;\n  text-align: left;\n  background: #f8f8f8;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n}\n.file-select-button[data-v-b483f8e0] {\n  background: #dce4ec;\n  padding: 5px 8px;\n  min-height: 40px;\n  display: inline-block;\n  font-weight: bold;\n}\n.file-ready[data-v-b483f8e0] {\n  background: #dce4ec;\n  padding: 12px 10px 12px 0;\n  display: inline-block;\n  font-weight: bold;\n}\n.file-image[data-v-b483f8e0] {\n  width: 27px;\n  margin: 0;\n}\n.file-upload .file-select[data-v-b483f8e0]:hover {\n  border-color: #80a3c5;\n  transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -webkit-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n}\n.file-upload .file-select:hover .file-select-button[data-v-b483f8e0] {\n  background: #65a5e6;\n  transition: all 0.2s ease-in-out;\n  -moz-transition: all 0.2s ease-in-out;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n}\n.file-upload .file-select:hover .file-ready[data-v-b483f8e0] {\n  background: #65a5e6;\n  color: #f8f8f8;\n  transition: all 0.2s ease-in-out;\n  -moz-transition: all 0.2s ease-in-out;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n}\n.file-upload-input[data-v-b483f8e0] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  z-index: 101;\n}\ninput[type=\"file\"][data-v-b483f8e0] {\n  z-index: 100;\n  cursor: pointer;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.file-upload .file-select.file-select-disabled[data-v-b483f8e0] {\n  opacity: 0.65;\n}\n.file-upload .file-select.file-select-disabled[data-v-b483f8e0]:hover {\n  cursor: default;\n  display: block;\n  border: 2px solid #dce4ec;\n  color: #34495e;\n  cursor: pointer;\n  height: 40px;\n  line-height: 40px;\n  margin-top: 5px;\n  text-align: left;\n  background: #ffffff;\n  overflow: hidden;\n  position: relative;\n}\n.file-upload .file-select.file-select-disabled:hover .file-select-button[data-v-b483f8e0] {\n  background: #dce4ec;\n  color: #666666;\n  padding: 0 10px;\n  display: inline-block;\n  height: 40px;\n  line-height: 40px;\n}\n.file-upload .file-select.file-select-disabled:hover .file-select-name[data-v-b483f8e0] {\n  line-height: 40px;\n  display: inline-block;\n  padding: 0 10px;\n}\n.delIcon[data-v-b483f8e0] {\n  position: absolute;\n  display: inline-block;\n  top: -2px;\n  right: 3px;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: bolder;\n  color: rgb(231, 20, 20);\n  cursor: pointer;\n}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-b483f8e0";var install = function installVueMultiImageUpload(app) {
  Object.entries(script).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,VueMultiImageUpload:script});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;