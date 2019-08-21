import {get,post} from '@/utils/request'

// export const query = function (pageNum,pageSize) {
//     return get('/post/query?page='+pageNum+'&rows='+pageSize)
// }
export const query=function (data) {
    return post('post/query',data)
}
export const save = function (data) {
    return post('post/save',data)
}
