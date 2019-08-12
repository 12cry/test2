import {get,post} from '@/utils/request'

export const query = function (pageNum,pageSize) {
    return get('/comment/query?page='+pageNum+'&rows='+pageSize)
}
export const save = function (data) {
    return post('/comment/save',data)
}
