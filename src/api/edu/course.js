import request from '@/utils/request'


export default {
  saveCourseInfo(courseInfoVO) {
    return request({
      url: `/eduservice/educourse/addCourse`,
      method: 'post',
      data: courseInfoVO
    })
  },
  getListTeacher() {
    return request({
      url: `/eduservice/teacher/findAllTeacher`,
      method: 'get'
    })
  },
  getCourseInfo(courseId){
    return request({
      url: `/eduservice/educourse/getCourse/` + courseId,
      method: 'get'
    })
  },
  updateCourse(courseInfoVO){
    return request({
      url: `/eduservice/educourse/updateCourse/`,
      method: 'post',
      data: courseInfoVO
    })
  },
  //查询确认课程信息
  getPublishCourseInfo(id){
    return request({
      url: `/eduservice/educourse/getPublishCourseInfo/` + id,
      method: 'get'
    })
  },
  //发布课程
  publishCourse(id){
    return request({
      url: `/eduservice/educourse/publishCourse/` + id,
      method: 'post'
    })
  },
  //分页条件查询
  pageListCondition(current,limit,courseQuery){
    return request({
      url: `/eduservice/educourse/pageListCondition/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  //删除课程信息
  deleteCourse(id){
    return request({
      url: `/eduservice/educourse/deleteCourse/` + id,
      method: 'delete',
    })
  },
}