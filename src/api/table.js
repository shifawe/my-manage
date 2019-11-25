import request from '@/utils/request'

export function fetchData(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
