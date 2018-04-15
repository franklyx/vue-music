import jsonp from 'common/js/jsonp'
import {commendParams, options} from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commendParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    format: 'jsonp'
  })
  return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commendParams, {
    topid: `${topid}`,
    platform: 'h5',
    needNewCode: 1,
    page: 'detail',
    type: 'top',
    tpl: 3,
    format: 'jsonp'
  })
  return jsonp(url, data, options)
}
