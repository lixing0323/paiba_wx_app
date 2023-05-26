const Big = require('@/common/big.min.js')

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
var dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000
  },
  humanize: function(milliseconds) {
    var humanize = '';
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
        break;
      }
    }
    return humanize || '刚刚';
  },
  format: function(dateStr) {
    var date = this.parse(dateStr)
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function(number) {
      return (number < 10 ? ('0' + number) : number);
    };
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
      _format(date.getHours()) + ':' + _format(date.getMinutes());
  },
  parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  }
};

// 下载文件
function downloadFile(src) {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a')
  eleLink.download = src
  eleLink.style.display = 'none'
  eleLink.target = '_blank'
  // 字符内容转变成blob地址
  eleLink.href = src
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // // 然后移除
  document.body.removeChild(eleLink)
}

function isEmptyValue(val) {
  return val === null || val === undefined || val === '' || (typeof val === 'string' && val.trim().length === 0)
}

// 计算浮点数之和
function getAdditionOfFloat(a, b) {
  a = arguments[0] ? arguments[0] : 0
  b = arguments[1] ? arguments[1] : 0
  const x = new Big(a)
  return Number(x.plus(b))
}

// 计算浮点数之乘法
function getMultiplicationOfFloat(a, b) {
  a = arguments[0] ? arguments[0] : 0
  b = arguments[1] ? arguments[1] : 0
  const x = new Big(a)
  return Number(x.times(b))
}

// 计算浮点数之除法
function getDivisionOfFloat(a, b) {
  a = arguments[0] ? arguments[0] : 0
  b = arguments[1] ? arguments[1] : 1
  const x = new Big(a)
  return Number(x.div(b))
}

import {
  getMyMessagesCount
} from '@/apis/message.js'
import {
  isUnLoginUser
} from '@/common/roles.js'

import {
  getVersionControl
} from '@/apis/user.js';

function setMessageCount() {
  const msgIndex = 3
  if (!isUnLoginUser()) {
    getVersionControl().then(versionControlResp => {
      if (versionControlResp.versionStatus !== 'Publishing') {
        getMyMessagesCount().then((res) => {
          if (res.unreadTotalCount === 0) {
            uni.removeTabBarBadge({
              index: msgIndex
            })
          } else {
            const showCount = res.unreadTotalCount <= 99 ? `${res.unreadTotalCount}` : '99+'
            uni.setTabBarBadge({
              index: msgIndex,
              text: showCount
            })
          }
        })
      }
    })
  } else {
    uni.removeTabBarBadge({
      index: msgIndex
    })
  }
}

function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}


export function px2rpx(num) {
  const {
    screenWidth
  } = uni.getSystemInfoSync()
  return (750 * num) / screenWidth
}

export function trim(value) {
  return value.replace(/(^\s*)|(\s*$)/g, "");
}

//内容替换
export function replaceAll(text, repstr, newstr) {
  return text.replace(new RegExp(repstr, "gm"), newstr);
}

export function getTimeRemaining(start) {
  let endTime = new Date(start)
  endTime.setDate(endTime.getDate() + 1)
  const startTime = new Date()
  const leftTime = endTime.getTime() - startTime.getTime() //距离结束时间的毫秒数

  let leftd = 0
  let lefth = 0
  let leftm = 0
  let lefts = 0
  if (leftTime > 0) {
    leftd = Math.floor(leftTime / (1000 * 60 * 60 * 24)) //计算天数
    lefth = Math.floor(leftTime / (1000 * 60 * 60) % 24) //计算小时数
    leftm = Math.floor(leftTime / (1000 * 60) % 60) //计算分钟数
    lefts = Math.floor(leftTime / 1000 % 60) //计算秒数
  }

  return {
    year: leftd,
    hour: lefth,
    minute: leftm,
    second: lefts
  }
}

function getValidValue(value) {
  let valid = true
  if (value === null || value === undefined || value === '') {
    valid = false
  } else if (typeof value === 'string' && !value.length) {
    value = value.trim()
  }
  return valid ? value : false
}

export {
  formatTime,
  formatLocation,
  dateUtils,
  downloadFile,
  isEmptyValue,
  getAdditionOfFloat,
  getMultiplicationOfFloat,
  getDivisionOfFloat,
  setMessageCount,
  deepClone,
  getValidValue
}