<template>
  <div>
    <el-container>
      <!--  图片  -->
      <el-main>
        <el-row>
          <el-col>
            <el-image :src="qrImage">


            </el-image>
          </el-col>

          <el-col>
            <p>打开微信扫一扫,快速登录</p>
          </el-col>
        </el-row>
        <!--  文字描述  -->
        <el-row>
          <p>...省略</p>
        </el-row>

      </el-main>


    </el-container>


  </div>
</template>

<script>
export default {
  // 二维码登录
  name: 'QrLogin',
  data () {
    return {
      qrImage: 'blogsService/blogs/createQr'
    }
  },
  methods: {},
  mounted () {
    // this.createQr()
  }
}
</script>

<style scoped>

</style>
