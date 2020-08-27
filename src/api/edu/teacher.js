import request from '@/utils/request'

export default {
    //1、分页条件查询讲师列表
    getTeacherListPage(current,limit,teacherQuery){
        return request ({
            url: `/eduservice/teacher/pageListCondition/${current}/${limit}`,
            method: 'post',
            data: teacherQuery
        })
    },
    //删除讲师
    deleteTeacherId(id){
        return request ({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
        })
    },
    //添加讲师
    save(teacher){
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    }
}