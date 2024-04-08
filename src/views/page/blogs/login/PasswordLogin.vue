<template>
  <div>
    <el-container>
      <el-main>
        <el-row>

          <!--手机号 邮箱密码登录-->
          <el-col>
            <el-input type="text"></el-input>
          </el-col>


        </el-row>

        <el-row>
          <!--     密码     -->
          <el-col>
            <el-input placeholder="密码"></el-input>
          </el-col>

        </el-row>

        <el-row>
          <el-col>
            <el-button type="warning">登录</el-button>
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
  // 密码登录
  name: 'PasswordLogin'
}
</script>

<style scoped>

</style>
