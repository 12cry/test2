import { post } from '@/utils/request'


export const query = function (data) {
    return post('article/query', data)
}
export const queryById = function (id) {
    return post('article/queryById/'+id)
}
