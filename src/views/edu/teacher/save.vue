<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="teacher.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
          </el-button>

          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 -->
          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/eduoss/fileoss/upload'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/edu/teacher"
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        //默认头像
        avatar: "https://ede-8888.oss-cn-shenzhen.aliyuncs.com/2020/08/30/e8d1de65bc24439293c07005689cb57dfile.png",
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false, // 图片上传是否显示
      imagecropperKey: 0, // 上传组件id
      BASE_API: process.env.BASE_API, //接口地址
    };
  },

  created() {
    this.init()
  },

  //监听
  watch: {
    //路由方式发生变化，就会执行
    $route(to,from){
      this.init()
    }
  },

  methods: {
    //初始化
    init() {
      //判断是修改还是添加，通过路由参数是否有id
      if (this.$route.params && this.$route.params.id) {
        //从路由获取id
        const id = this.$route.params.id;
        //渲染界面
        this.getTeacherById(id);
      } else {
        this.teacher = {};
      }
    },

    //通过id查询讲师信息
    getTeacherById(id) {
      teacherApi.getTeacherById(id).then((response) => {
        this.teacher = response.data.teacher;
      });
    },

    //调用保存或者修改方法
    saveOrUpdate() {
      if (this.teacher.id) {
        //修改
        this.updateTeacher();
      } else {
        this.saveData();
      }
    },

    //修改讲师信息
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //回到讲师列表
        this.$router.push({ path: "/teacher/table" });
      });
    },

    // 保存
    saveData() {
      teacherApi.save(this.teacher).then((response) => {
        this.$message({
          type: "success",
          message: "保存成功!",
        });
        //回到讲师列表
        this.$router.push({ path: "/teacher/table" });
      });
    },

    //上传方法
    cropSuccess(data) {
      // 关闭弹窗
      this.imagecropperShow = false
      // 返回url
      this.teacher.avatar = data.url
      //初始化上传组件
      this.imagecropperKey = this.imagecropperKey + 1
    },

    //关闭弹窗方法
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
};
</script>