import { get, post } from '@/utils/request'

export const appreciate = function (data) {
    return post('post/appreciate', data)
}
export const query = function (data) {
    return post('post/query', data)
}
export const save = function (data) {
    return post('post/save', data)
}
