import request from '@/utils/request'


export default {
  saveCourseInfo(courseInfoVO) {
    return request({
      url: `/eduservice/educourse/addCourse`,
      method: 'post',
      data: courseInfoVO
    })
  }
}