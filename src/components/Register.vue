<template>
  <div id="Login">
    <div class="note" style ="note"></div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="12" :offset="6" :xs="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix" style="text-align: center">
                <a class="icon iconfont el-icon-icon" @click="login">用户登录</a>
                /
                <a class="icon iconfont el-icon-zhuce" @click="register">用户注册</a>
              </div>
              <el-form label-width="80px">
                <el-form-item label="用户名">
                  <el-input v-model="form.name" label-width="20px"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="form.password" type="password" label-width="80px"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="registerTrue({name:form.name,password:form.password,phone:form.phone})">注册</el-button>
                </el-form-item>
              </el-form>
              <el-row>
                <el-col :span="12" :offset="6">
                  <router-view></router-view>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Register',
  methods: {
    login () {
      this.$router.push({path: '/login'})
    },
    register () {
      this.$router.push({path: '/register'})
    }
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'form',
      'status'
    ])
  },
  methods1: {
    ...mapActions([
      'registerTrue'
    ])
  },
  watch: {
    status: function () {
      if (this.status === 1) {
        console.log(4545)
        this.$http.post('/api/register', {data: this.form})
          .then((data) => {
            console.log(data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  data () {
    return {
      note: {
        backgroundImage: 'url(' + require('../../static/background.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>

<style>
  .el-container{
    margin-top: 120px;
    margin-right: 450px;
    margin-left: 450px;
  }
  .el-card{
    background:
      -webkit-linear-gradient(
        top,
        rgb(235, 241, 246) 0%,
        rgb(171, 211, 238) 23%,
        rgb(137, 195, 235) 66%,
        rgb(213, 235, 251) 100%);
    /* Chrome10-25,Safari5.1-6 */
  }
</style>
