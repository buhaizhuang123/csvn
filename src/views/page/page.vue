<template>
  <div>
    <el-container>

      <el-header>
        <div class="page-header">
          <el-row>
            <!--     左部分     -->
            <el-col :span="8">
              <el-col :span="3">
                <el-image style="width: 100%;height: 100%" src='static/20201124032511.png'></el-image>
              </el-col>
              <el-col :span="3">
                <p>博客</p>
              </el-col>
              <el-col :span="3">
                <p>下载</p>
              </el-col>
              <el-col :span="3">
                <p>学习</p>
              </el-col>
              <el-col :span="3">
                <p>社区</p>
              </el-col>
              <el-col :span="3">
                <p>知道</p>
              </el-col>
              <el-col :span="3">
                <p>GitCode</p>
              </el-col>
              <el-col :span="3">
                <p>insCode</p>
              </el-col>
            </el-col>
            <!--    中间部分      -->
            <el-col :span="8" class="page_header_search_input">
              <el-col :span="20">
                <el-input type="text" style="border-radius: 16px 0 0 16px"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="warning">搜索</el-button>
              </el-col>
            </el-col>
            <!--    右半部分      -->
            <el-col :span="8">
              <el-col :span="4">
                <el-button class="login_button" @click="()=> {this.loginPageShow=true}">登录</el-button>
              </el-col>
              <el-col :span="4">
                <p>会员中心</p>
              </el-col>
              <el-col :span="4">
                <!--                style="width: auto" :default-active="$route.path" :router="true" mode="horizontal"-->
                <el-menu default-active="1">

                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-message"></i>
                      <span>消息</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="1-1">评论和@</el-menu-item>
                      <el-menu-item index="1-2">新增粉丝</el-menu-item>
                      <el-menu-item index="1-3">赞和收藏</el-menu-item>
                      <el-menu-item index="1-4">私信</el-menu-item>
                      <el-menu-item index="1-5">系统通知</el-menu-item>
                      <el-menu-item index="1-5">消息设置</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </el-col>
              <el-col :span="4">
                <p>历史</p>
              </el-col>
              <el-col :span="4">
                <p>创作中心</p>
              </el-col>
              <el-col :span="4">
                <el-button class="publish_btn" type="primary" @click="openRiskText">发布</el-button>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>

        <el-dialog :visible.sync="loginPageShow">
          <LoginPage></LoginPage>
        </el-dialog>

        <el-dialog :visible.sync="riskTextShow">
          <publish></publish>
        </el-dialog>

        <router-view/>


      </el-main>

    </el-container>

  </div>
</template>

<script>
import LoginPage from './blogs/login/LoginPage' // 登录页面
import publish from './blogs/publish/publish'// 富文本编辑 发布页面

export default {
  name: 'page',
  components: {
    LoginPage, publish
  },
  data () {
    return {
      loginPageShow: false,
      riskTextShow: false
    }
  },
  methods: {
    openRiskText () {
      this.$router.push('/publish')
    }
  }
}
</script>

<style scoped>
.page-header {
  /*固定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /*背景颜色*/
  background-color: #fefefe;
  /*阴影*/
  box-shadow: 2px 2px #fafafa;
  /*font-family: 'PingFang SC','SF Pro Display','Microsoft YaHei',Roboto,Noto,Arial,sans-serif;*/
}


.page_header_search_input {
  padding-top: 7px;
}

.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  /* min-width: 200px; */
}

.login_button {
  border-color: white;
  font-size: 16px;
  margin: 0 auto;
  padding-top: 20px;

  ont-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.publish_btn {
  padding-top: 17px;
  border-color: white;
  background-color: white;
  color: #2c3e50;
}

</style>
