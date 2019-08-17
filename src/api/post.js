import {get,post} from '@/utils/request'

export const query = function (pageNum,pageSize) {
    return get('/post/query?page='+pageNum+'&rows='+pageSize)
}
export const save = function (data) {
    return post('/post/save',data)
}
