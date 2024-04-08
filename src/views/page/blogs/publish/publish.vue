<template>


  <el-container>
    <el-header>
    </el-header>
    <el-main>
      <el-form ref="form" :model="rickText" label-width="80px" :rules="rules">
        <el-form-item>
          <el-button class="redirect_page" @click="redirectPage">跳转首页</el-button>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input label="标题" v-model="rickText.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <div class="risk_text">
            <editor
              v-model="rickText.content"
              :init="init"
              :disabled="disabled">
              @onClick="onClick"
            </editor>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveContent(rickText)">保存</el-button>
        </el-form-item>

      </el-form>
      <el-row>
        <el-col>
        </el-col>
        <el-col>

        </el-col>
      </el-row>


    </el-main>
  </el-container>


</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/skins/ui/oxide/skin.css'
import '@/assets/tinymce/zh_CN.js' // 本地汉化
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/icons/default' // 图标 -解决测试环境找不icon问题
export default {
  name: 'publish',
  components: {
    Editor,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      //初始化配置
      init: {
        language_url: '@/asset/tinymce/langs/zh_CN.js', // 这里需要单独处理
        language: 'zh_CN',
        height: 500,
        width: 'auto',
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: true,
        menubar: true,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        },

        resize: true,
      },
      rickText: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ],
      }
    }
  },
  mounted () {
    var params = this.$route.params
    console.log(params)
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    redirectPage () {
      this.$router.push('/blogs')
    },
    saveContent (content) {
      console.log(content)

      this.$refs['form'].validate(
        (valid) => {
          if (valid) {
            // 调用保存方法
            this.$axios.post('/blogsService/blogs/saveContent', content)
              .then(res => {
                this.$message.success('发布成功')
              })
              .catch(err => console.log(err))
          } else {
            this.$message.error('必输项校验未通过！！！')
          }
        }
      )

    }
  }
}
</script>

<style scoped>
.tiptap-editor .ProseMirror {
  width: 100%; /* 设置编辑器的宽度 */
  /* 你可以添加更多的样式来调整编辑器的外观 */
}

.editor .tox tox-tinymce {
  width: 680px;
}

.editor .tox tox-tinymce {
  width: 100px;
}

.redirect_page {
  border-color: white;
  float: left;
}

</style>
