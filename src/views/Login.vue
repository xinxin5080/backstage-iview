<template>
  <div class="login">
     <Form ref="formValidate" :model="formName" :rules="ruleValidate" class="box">
        <FormItem  prop="username">
            <Input v-model="formName.username" placeholder="用户名"></Input>
        </FormItem>
        <FormItem  prop="password">
            <Input v-model="formName.password" placeholder="密码"></Input>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
import { Login } from '../app/index.js'
export default {
  data () {
    return {
      formName: {
        username: 'admin',
        password: '123456'
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]

      }
    }
  },
  methods: {
    // 登录
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 发送请求
          Login({ username: this.formName.username, password: this.formName.password })
            .then(res => {
              this.$Message.success(res.data.meta.msg)
              console.log(res)
              if (res.data.meta.status === 200) {
                // 跳到首页
                this.$router.push({ name: 'home' })
                // 获取token
                let token = res.data.data.token
                // 储存起来
                localStorage.setItem('mytoken', token)
              } else {
                this.$Message.error(res.data.meta.msg)
              }
            })
        } else {
          this.$Message.error('失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .login{
   position: fixed;
   width: 100%;
   height: 100%;
   background-color: #2f4050;
  .box {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 15px 40px 15px 40px;
    margin: 200px auto;
    background-color:#fff;
    .ivu-btn{
      width: 100%;
    }
  }
 }
</style>
