import {get,post} from '@/utils/request'

export const login=function (data) {
    return post('/user/login',data)
}
