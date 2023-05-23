import {
  isFloatForTwo,
  isNumber,
  isUnifyCode,
  isVerifyIdCard,
  isVerifyHKCard,
  isVerifyTWCard,
  isVerifyPassPortCard,
  validateCellPhone
} from '@/common/regular.js'

export const validateFloat = (rule, value, callback) => {
  if (!isFloatForTwo(value)) {
    callback(new Error('请输入数字，小数点后最多两位数字'))
  } else {
    callback()
  }
}

export const validateNumGreaterThanZero = (rule, value, callback) => {
  if (value <= 0) {
    callback(new Error('请输入大于0的数字'))
  } else {
    callback()
  }
}

export const validateNumber = (rule, value, callback) => {
  if (!isNumber(value)) {
    callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

export const validateIdCardNo = (rule, value, callback) => {
  if (isVerifyIdCard(value)) {
    if (!isVerifyIdCard(value).status) {
      callback(new Error(isVerifyIdCard(value).msg))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export const verifyHKCard = (rule, value, callback) => {
  if (!isVerifyHKCard(value).status) {
    callback(new Error(isVerifyHKCard(value).msg))
  } else {
    callback()
  }
}

export const verifyPassPortCard = (rule, value, callback) => {
  if (!isVerifyPassPortCard(value).status) {
    callback(new Error(isVerifyPassPortCard(value).msg))
  } else {
    callback()
  }
}

const verifyTWCard = (rule, value, callback) => {
  if (!isVerifyTWCard(value).status) {
    callback(new Error(isVerifyTWCard(value).msg))
  } else {
    callback()
  }
}

export const verifyUnifyCode = (rule, value, callback) => {
  if (!isUnifyCode(value)) {
    callback(new Error('请输入正确的统一社会信用代码'))
  } else {
    callback()
  }
}

