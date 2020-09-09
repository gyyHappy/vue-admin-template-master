<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      filterText: "",
      data2: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },

  created() {
    this.getAllSubject();
  },

  methods: {

    //搜索框输入搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },

    //获取课程分类列表
    getAllSubject() {
      subject.getSubjectList  ().then((response) => {
        this.data2 = response.data.list;
      });
    },
  },
};
</script>

