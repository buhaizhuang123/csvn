<template>
  <!--  博客信息页  -->
  <el-container>
    <!--  头 关注、后端...  -->
    <el-header>
      <!--   v-for 必须指定一个key   -->
      <el-row class="content_title">
        <el-col v-for="(item,index) in titles" :key="index" :span="2" :title="item.themeName"
        >
          <el-button @click="switchTheme(item)">
            {{
              item.themeName
            }}
          </el-button>

        </el-col>
      </el-row>
    </el-header>


    <!--  blogsContent 内容  -->
    <el-main>
      <el-row>
        <div class="content">
          <el-col :span="16">
            <div style="margin-top:1rem;height:100%" class="line-time">
              <el-timeline ref="opertimeline" style="height:96%;overflow: auto;">
                <el-timeline-item placement="top" v-for="(item,index) in content_infos" :key="index">
                  <el-col :span="6">
                    <p>{{ item.content_image }}</p>
                  </el-col>
                  <el-col :span="18" class="blogs_content">
                    <el-col>{{ item.title }}</el-col>
                    <el-col>
                      <el-card class="content_0" v-html="item.blogsContent"></el-card>
                    </el-col>
                    <el-col class="content_bottom">
                      <el-col :span="12">
                        <el-col :span="6">
                          <el-col :span="12">
                            <el-image src="static/点赞.png" style="width:20px;height:20px"></el-image>
                          </el-col>
                          <el-col :span="12">{{ item.like }}</el-col>
                        </el-col>
                        <el-col :span="6">
                          <el-col :span="12">
                            <el-image src="static/点踩.png" style="width:20px;height:18px"></el-image>
                          </el-col>
                          <el-col :span="12">
                            {{ item.unLike }}
                          </el-col>
                        </el-col>
                        <el-col :span="6">作者 : {{ item.blgName }}</el-col>
                        <el-col :span="6">
                          <a @click="openBlogs(item)">...</a>
                        </el-col>
                      </el-col>
                      <el-col :span="12"></el-col>
                    </el-col>
                  </el-col>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-col>
        </div>
        <el-col :span="8">
          <!--    广告窗      -->
          <div class="advertising_head">
            <p>广告窗</p>
          </div>

          <!--    作者推荐      -->
          <div>
            <p class="recommend">作者推荐</p>
            <div>
              <el-row class="blogs-author-tj" v-for="(item,index) in authors" :key="index">
                <el-col :span="4">{{ item.titleImage }}</el-col>
                <el-col :span="16">
                  <el-col>{{ item.blgName }}</el-col>
                  <el-col>{{ item.bloggerMark }}</el-col>
                </el-col>
                <!--        关注 有触发效果        -->
                <el-col :span="4">关注</el-col>
              </el-row>
            </div>

          </div>

          <!--    官方博客      -->
          <div>
            <el-row>
              <el-col :span="12">官方博客</el-col>
              <el-col :span="12">官方账号入住</el-col>
            </el-row>
            <div>
              <el-row class="blogs-author-tj" v-for="(item,index) in official_authors" :key="index">
                <el-col :span="4">{{ item.titleImage }}</el-col>
                <el-col :span="16">
                  <el-col>{{ item.blgName }}</el-col>
                  <el-col>{{ item.bloggerMark }}</el-col>
                </el-col>
                <!--        关注 有触发效果        -->
                <el-col :span="4">关注</el-col>
              </el-row>
            </div>

          </div>

          <!--    推荐页 你是否愿意向朋友推荐博客首页      -->
          <div>
            <p>你是否愿意向朋友推荐博客首页</p>
            <el-row>
              <el-col :span="4">
                <el-col>图片</el-col>
                <el-col>很不推荐</el-col>
              </el-col>
              <el-col :span="4">
                <el-col>图片</el-col>
                <el-col>不推荐</el-col>
              </el-col>
              <el-col :span="4">
                <el-col>图片</el-col>
                <el-col>一般</el-col>
              </el-col>
              <el-col :span="4">
                <el-col>图片</el-col>
                <el-col>推荐</el-col>
              </el-col>
              <el-col :span="4">
                <el-col>图片</el-col>
                <el-col>强烈推荐</el-col>
              </el-col>
            </el-row>
          </div>

          <!--    联系我们      -->
          <div class="call_me">
            <!--  head       -->
            <el-row>
              <el-col>联系我们</el-col>
              <el-col :span="18">00000-0000-000</el-col>
              <el-col :span="6">在线客服</el-col>
            </el-row>
            <!--      关于我们、招贤纳士、商务合作、寻求报道      -->
            <el-row>
              <el-col :span="6">关于我们</el-col>
              <el-col :span="6">| 招贤纳士</el-col>
              <el-col :span="6">| 商务合作</el-col>
              <el-col :span="6">| 寻求报道</el-col>
            </el-row>
            <!--    备案信息      -->
            <el-row>
              <el-col :span="12">京备案信息 xxxx 号</el-col>
              <el-col :span="12">经营性网站备案信息</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="3">图片</el-col>
                <el-col :span="21">公安备案号</el-col>
              </el-col>
              <el-col :span="12">经营性网站备案信息</el-col>
              ...
            </el-row>

          </div>

        </el-col>

      </el-row>
      <el-dialog :visible.syncs="publishPageShow" title="博客信息页" @close="closeBlogsPage" :destroy-on-close="true">
        <publish :blogContent="contentInfo"></publish>
      </el-dialog>
    </el-main>

  </el-container>

</template>

<script>
import publish from './publish/publish'

export default {
  name: 'blogs',
  data () {
    return {
      titles: [],
      // 创作者信息
      authors: [
        {blgName: '', titleImage: '', bloggerMark: ''},
      ],
      official_authors: [
        {blgName: '', titleImage: '', bloggerMark: ''},
      ],
      content_infos: [],
      pageNum: 0,
      total: 0,
      publishPageShow: false,
      contentInfo: {},
      themeId: '3' // 推荐
    }
  },
  components: {publish},
  mounted () {
    // 个人博主
    this.findBloggerInfo('2')
    // 企业博主
    this.findBloggerInfo('1')
    // 查询文章信息
    this.findBlogsContentInfo()
    // 监听滚动事件
    window.addEventListener('scroll', this.findBlogsContentInfo, true)
    // 题材列表
    this.listAllTheme()

  },
  methods: {
    // 查询博主信息
    findBloggerInfo (type) {
      var req = {type: type}
      this.$axios.post('/blogsService/blogs/listBloggerInfo?pageNum=1&pageSize=10', req)
        .then(res => {
          if (type === '1') {
            this.official_authors = res.data.data.list
          } else {
            this.authors = res.data.data.list
          }
        }).catch(err => {
        console.log(err)
      })
    },
    // 查询博客信息
    findBlogsContentInfo () {
      if (this.total < (this.pageNum * 10)) return
      this.pageNum++
      this.$axios.post('/blogsService/blogs/listAllBlogs?pageNum=' + this.pageNum + '&pageSize=10&themeId=' + this.themeId)
        .then(res => {
          this.content_infos = this.content_infos.concat(res.data.data.list)
          this.total = res.data.data.total
        }).catch(err => {
        console.log(err)
      })
    },
    // 打开详细页
    openBlogs (data) {
      console.log(data)
      // 打开页面
      this.publishPageShow = true
      this.contentInfo = data
    },
    closeBlogsPage () {
      this.publishPageShow = false
    },
    // 题材列表查询
    listAllTheme () {
      this.$axios.post('/blogsService/theme/listAll')
        .then(res => {
          this.titles = res.data.data
        }).catch(err => {
        console.log(err)
      })
    },
    // 切换题材
    switchTheme (theme) {
      this.themeId = theme.themeId
      this.init()
      this.findBlogsContentInfo()
    },
    // 初始化
    init () {
      this.content_infos = []
      this.pageNum = 0
      this.total = 0
    }
  }
}
</script>

<style scoped>
.advertising_head {
  width: 95%;
  height: 200px;
}

.blogs-author-tj {
  border: 1px solid #d5d4d4;
  font-size: 13px;
  font-family: "Times New Roman", Times, Serif;
}

.call_me {
  width: 100%;
  height: 300px;
  color: #c2c2c2;
}

.call_me .el-row {
  padding-top: 20px;
}

.blogsContent .el-row {
  height: 200px;
  display: flex;
}

.content_title {
  border: 1px solid #ffffff;
  box-shadow: 2px 2px #d7d7d7;

}

.blogs_content {
  float: left;
  border: #d7d7d7 1px solid;
  height: 200px;
}

.blogs_content .content_0 {
  overflow: hidden;
  height: 100px;
}

.content_bottom {
  padding-top: 20px;
}


</style>
