<template>
  <div>

    <el-container>
      <el-main>
        <el-row>
          <!--  选择框   -->
          <!--  手机号输入框    -->

          <el-col :span="4">
            <el-select v-model="loginTyp">
              <el-option v-for="(item,index) in phoneTypes" :key="index" :value="item.value"
                         :label="item.value"></el-option>
            </el-select>
          </el-col>

          <el-col :span="20">
            <el-input type="text"></el-input>
          </el-col>


        </el-row>

        <el-row>
          <!--  验证码输入框    -->
          <!--  获取验证码    -->

          <el-col :span="18">
            <el-input v-model="input" placeholder="请输入验证码"></el-input>
          </el-col>

          <el-col :span="6">
            <el-button type="primary">获取验证码</el-button>

          </el-col>

        </el-row>

        <el-row>
          <el-col>
            <el-button type="warning">登录/注册</el-button>
          </el-col>

          <el-col>

            <el-radio label="true">
              我已阅读并同意 服务条款 和 隐私协议
            </el-radio>

          </el-col>

        </el-row>

      </el-main>

    </el-container>
  </div>
</template>

<script>
export default {
  // 免密登录
  name: 'NoPasswordLogin',
  data () {
    return {
      loginTyp: '',
      phoneTypes: [
        {type: 'inner', value: '0351'},
        {type: 'outer', value: '0000'},
      ]
    }
  }
}
</script>

<style scoped>

</style>
