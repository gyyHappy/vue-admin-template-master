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
      method: 'get',
    })
  },
  getCourseInfo(courseId){
    return request({
      url: `/eduservice/educourse/getCourse/` + courseId,
      method: 'get',
    })
  },
  updateCourse(courseInfoVO){
    return request({
      url: `/eduservice/educourse/updateCourse/`,
      method: 'post',
      data: courseInfoVO
    })
  }
}