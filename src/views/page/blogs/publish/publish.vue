<template>


  <el-container>
    <el-header>
    </el-header>
    <el-main>
      <el-form ref="form" :model="rickText" label-width="80px" :rules="rules">
        <el-form-item>
          <el-button class="redirect_page" @click="redirectPage" v-if="!blogContent">跳转首页</el-button>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input label="标题" v-model="rickText.title" placeholder="标题" :readonly="!(blogContent == null)"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <div class="risk_text">
            <editor
              v-model="rickText.content"
              :init="init"
              :disabled="blogContent != null">
              @onClick="onClick"
            </editor>
          </div>
        </el-form-item>

        <!--    一些按钮点赞、收藏、踩    -->
        <el-form-item>
          <el-col>
            <el-col :span="1">
              <el-image src="static/点赞.png" style="width:20px;height:20px"
                        @click="clickButton(rickText['blogId'],1)"></el-image>
            </el-col>
            <el-col :span="1">
              <el-image src="static/点踩.png" style="width:20px;height:18px"
                        @click="clickButton(rickText['blogId'],2)"></el-image>
            </el-col>
            <el-col :span="3">
              <el-select placeholder="文章标签选择" v-model="rickText['themeId']">
                <el-option v-for="(item,index) in themeList" :key="index" :label="item.themeName"
                           :value="item.themeId"></el-option>
              </el-select>

            </el-col>
            <!--收藏-->
          </el-col>
        </el-form-item>
        <!--    文件上传    -->
        <el-form-item>
          <el-upload
            action="on"
            :http-request="uploadFiles"
            multiple
            :limit="3"
            :file-list="fileList">
            <el-button size="small" type="primary" v-if="!blogContent">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="!blogContent">上传文章所携带的视频｜图片文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item
          v-for="(item,index) in blogContent &&  blogContent.fileIds ?  blogContent.fileIds.split(',') : '' "
          :key="index">
          <a href="#" @click="preview(videoSrc+'?fileId='+item)">视频 {{ index }}</a>
        </el-form-item>
        <el-dialog title="视频播放页" :visible.sync="videoShow" @close="()=> {this.videoShow = false}"
                   :destroy-on-close="true" :append-to-body="true">
          <Video :videoTitleImg="videoTitleImg" :videoSrc="videoTempSrc"></Video>
        </el-dialog>

        <el-form-item>
          <el-button type="primary" @click="saveContent(rickText)" v-if="!blogContent">保存</el-button>
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
  <!-- secret key UaNy0pAHsNWqs1OaGABQ4PGTLwocul3k-->
  <!-- accesss key xhWh2ZXlbrsKIwMC2Ea7KQIA -->
  <!-- appId  63616617 -->

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
import Video from '../../video/Video'

export default {
  name: 'publish',
  components: {
    Editor, Video,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    // todo 标记文章是否可编辑根据是否为本文作者
    blogContent: {
      type: Object,
      default: null
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
        content: '',
        fileIds: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ],
      },
      autoCommit: false, // 是否自动上传
      fileList: [],
      videoTitleImg: '',
      videoSrc: 'http://localhost:1012/blogFile/preview',
      videoTempSrc: '',
      videoShow: false,
      themeList: []
    }
  },
  mounted () {
    // 外部进来 加载文件信息
    if (this.blogContent) {
      console.log(this.blogContent, 'this.blogContent')
      if (this.blogContent.fileIds) {

      }
    }

    this.listAllTheme()
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

    },
    clickButton (blogId, like) {
      // 1 点赞
      // 2 点踩
      // 3 收藏

      // todo 后端判断什么事件 调用后端
      console.log('请求后端')
    },
    uploadFiles (data) {
      console.log(data, 'data')
      let formData = new FormData()
      formData.append('file', data.file)
      console.log(formData)

      this.$refs['form'].validate(
        (valid) => {
          if (valid) {
            // 调用文件上传方法
            this.$axios.post('/blogsService/blogFile/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': true,
                'enctype': 'multipart/form-data'
              }
            })
              .then(res => {
                // 将文件id 插入 富文本内容中
                if (this.rickText.fileIds !== '') {
                  this.rickText.fileIds = this.rickText.fileIds + ',' + res.data.data
                } else {
                  this.rickText.fileIds = res.data.data
                }
                this.$message.success('发布成功')
                this.$router.push('/blogs')
              })
              .catch(err => console.log(err))

          } else {
            this.$message.error('必输项校验未通过！！！')
          }
        }
      )

    },
    // 预览
    preview (vSrc) {
      this.videoTempSrc = vSrc
      this.videoShow = true
    },
    // 题材列表查询
    listAllTheme () {
      this.$axios.post('/blogsService/theme/listAll')
        .then(res => {
          this.themeList = res.data.data
        }).catch(err => {
        console.log(err)
      })
    },
  },
  watch: {
    blogContent: {
      handler (nwVal, old) {
        if (nwVal) {
          this.rickText = nwVal
          this.rickText['content'] = nwVal['blogsContent']
        }
      },
      deep: true,
      immediate: true
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
