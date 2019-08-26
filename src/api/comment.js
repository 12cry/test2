import { get, post } from '@/utils/request'

export const appreciate = function (data) {
    return post('comment/appreciate', data)
}
export const query = function (data) {
    return post('/comment/query', data)
}
export const save = function (data) {
    return post('/comment/save', data)
}
