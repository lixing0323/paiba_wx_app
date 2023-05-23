import {
  getDivisionOfFloat,
  parseTime,
  getRoundMoney,
  getMultiplicationOfFloat
} from './utils'

const CURRENCY_TYPE = {
  CNY: {
    symbol: '¥',
    name: '人民币'
  },
  USD: {
    symbol: '$',
    name: '美元'
  }
}

export function formatTime(time) {
  return parseTime(time, '{y}-{m}-{d} {h}:{i}')
}

export function changeToWan(money, ratio = 10000) {
  return getDivisionOfFloat(money, ratio)
}

export function changeToYuan(money) {
  return getMultiplicationOfFloat(money, 10000)
}

// 数组拼接
export function getArrayToString(val, key = 'name') {
  let array = []
  if (val && val.length > 0) {
    array = val.map(i => i[key])
    return array.join('、')
  }
  return '无'
}

// 加单位
export function joinUnitToData(data, unit, filter) {
  if (data === null) {
    return '无'
  } else {
    if (!filter) {
      return `${data}${unit}`
    } else {
      return `${filter(data)}${unit}`
    }
  }
  return data
}

// 接口enum处理
export function changeEnumToValue(data, key) {
  return data[key] ? data[key].value : '无'
}

// 接口boolean值处理
export function changeBooleanToValue(data, key) {
  if (data[key]) {
    return data[key] ? '是' : '否'
  }
  return '无'
}

// 获取参考利率的显示内容
export function getReferenceRateContent(val1, val2) {
  const min = parseFloat(val1)
  const max = parseFloat(val2)
  let content
  if (min && !max) {
    content = `${min}%`
  } else if (!min && max) {
    content = `最高 ${max}%`
  } else if (min && max) {
    content = `${min} - ${max}%`
  } else {
    content = `${min}% `
  }
  return content
}

// 获取产品额度的显示内容
export function getProductQuotaContent(val1, val2) {
  const min = parseFloat(val1)
  const max = parseFloat(val2)
  let content = ''
  if (max && min) {
    content = `${moneyFilter(min)}-${moneyFilter(max)}`
  } else if (!max && min) {
    content = `${moneyFilter(min)}`
  }
  return content
}

export function getProductTermContent(val1, val2) {
  const min = parseFloat(val1)
  const max = parseFloat(val2)
  let content
  if (max && !min) {
    content = `最高 ${max}个月`
  } else if (max) {
    content = `${min}-${max}个月`
  } else if (!max && min) {
    content = `${min}个月`
  } else {
    content = `不限`
  }
  return content
}

// 省市区数据转换
export function changeZonesDataKey(val) {
  val.forEach(item => {
    item.text = item.label
    if (item.children && item.children.length > 0) {
      changeZonesDataKey(item.children)
    }
  })
  return val
}

// 拼接省市区显示
export function getZonesShow(province, city, district, address) {
  const extra = address ? `/${address}` : ''
  return province ? `${province.name}/${city.name}/${district.name}${extra}` : '-'
}

export function getAgeFromIdCard(idCard) {
  let age = '-'
  if (idCard && idCard.length === 18) {
    // 身份证6-10位
    const year = Number(idCard.substring(6, 10))
    const now = new Date().getFullYear()
    age = now - year
  }
  return age
}

// 判断是否换行显示
export function directionType(t, val) {
  return t.direction && val && val !== '无' ? t.direction : 'row'
}

// 转换images格式
export function changeImagesWithUrl(data) {
  const images = []
  if (data.length > 0) {
    data.forEach(item => {
      images.push({
        url: item
      })
    })
    return images
  }

  return []
}

// 判断显示元还是万元
export function moneyFilter(val, isToFixed = false) {
  let result
  if (val && val >= 10000) {
    result = isToFixed ? `${changeToWan(val).toFixed(4)}万元` : `${changeToWan(val)}万元`
  } else if (val && val < 10000) {
    result = `${val}元`
  } else if (val === 0 || !val) {
    return 0
  }
  return result
}

export function getTabMarginTop(isShowTab = true) {
  let marginTop
  wx.getSystemInfo({
    success: function(res) {
      const menuButton = wx.getMenuButtonBoundingClientRect()
      marginTop = `${ menuButton.top + menuButton.height + (isShowTab ? 50 : 10)}px`
    }
  })
  return marginTop
}

export function getContentPaddingTop() {
  let paddingTop
  wx.getSystemInfo({
    success: function(res) {
      const menuButton = wx.getMenuButtonBoundingClientRect()
      paddingTop = `${ menuButton.top + menuButton.height + 20}px`
    }
  })
  return paddingTop
}


export function amountName(type) {
  if (type === 'LOAN') {
    return '贷款额度'
  } else if (type === 'FINANCIAL') {
    return '起购金额'
  } else if (type === 'DEPOSIT') {
    return '起存金额'
  }
}

export function rateName(type) {
  if (type === 'LOAN') {
    return '参考利率'
  } else if (type === 'FINANCIAL') {
    return '业绩比较基准率'
  } else if (type === 'DEPOSIT') {
    return '年利率'
  }
}
