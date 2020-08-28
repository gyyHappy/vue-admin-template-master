<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'

export default {
   data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },

  created(){
    //判断是修改还是添加，通过路由参数是否有id
    if(this.$route.params && this.$route.params.id){
      //从路由获取id
      const id = this.$route.params.id
      //渲染界面
      this.getTeacherById(id)
    }
  },

  methods: {

    //通过id查询讲师信息
    getTeacherById(id){
      teacherApi.getTeacherById(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },

    //调用保存或者修改方法
    saveOrUpdate() {
      if(this.teacher.id){
        //修改
        this.updateTeacher()
      }else{
        this.saveData()
      }
    },

    //修改讲师信息
    updateTeacher(){
      teacherApi.updateTeacherInfo(this.teacher)
        .then(response => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          //回到讲师列表
          this.$router.push({path:'/teacher/table'})
        })
    },

    // 保存
    saveData() {
      teacherApi.save(this.teacher)
        .then(response => {
          this.$message({
            type: "success",
            message: "保存成功!",
          });
          //回到讲师列表
          this.$router.push({path:'/teacher/table'})
        })
    }

  }
}
</script>