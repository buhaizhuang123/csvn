<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="微信登录" name="wxLogin">
      <QrLogin></QrLogin>
    </el-tab-pane>
    <el-tab-pane label="免密登录" name="noPassword">
      <NoPasswordLogin></NoPasswordLogin>
    </el-tab-pane>
    <el-tab-pane label="密码登录" name="password">
      <PasswordLogin></PasswordLogin>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import QrLogin from './QrLogin'
import NoPasswordLogin from './NoPasswordLogin'
import PasswordLogin from './PasswordLogin'

export default {
  name: 'LoginPage',
  components: {
    QrLogin, NoPasswordLogin, PasswordLogin
  },
  data () {
    return {
      activeName: 'wxLogin'
    }
  },
  methods: {
    handleClick () {

    }
  }
}
</script>

<style scoped>

</style>
