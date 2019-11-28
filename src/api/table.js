import request from '@/utils/request'

export function fetchData(query) {
  return request({
    url: '/table/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/table/detail',
    method: 'get',
    params: { id }
  })
}