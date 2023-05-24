import {
  getCOSAuthorization
} from '@/apis/cos.js'
import {
  VUE_APP_COS_BUCKET,
  VUE_APP_COS_REGION
} from '@/common/const.js'

var COS = require('@/js_modules/wx-cos/cos-wx-sdk-v5.js');

export const COS_IMAGE_PREFIX = '?imageView2'
// 存储桶名称，由bucketname-appid 组成，appid必须填入，可以在COS控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket

// 存储桶Region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/
// 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224

var getAuthorization = function(options, callback) {
  getCOSAuthorization().then(response => {
    var data = response;
    var credentials = data && data.credentials;
    if (!data || !credentials) return console.error('credentials invalid');
    callback({
      TmpSecretId: credentials.tmpSecretId,
      TmpSecretKey: credentials.tmpSecretKey,
      XCosSecurityToken: credentials.sessionToken,
      StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
      ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
    });
  }).catch(() => {
    callback('error')
  })
};

// 初始化实例
var cos = new COS({
  // path style 指正式请求时，Bucket 是在 path 里，这样用相同园区多个 bucket 只需要配置一个园区域名
  // ForcePathStyle: true,
  getAuthorization: getAuthorization,
  // 是否使用全球加速域名。开启该配置后仅以下接口支持操作：putObject、getObject、headObject、optionsObject、multipartInit、multipartListPart、multipartUpload、multipartAbort、multipartComplete、multipartList、sliceUploadFile、uploadFiles
  // UseAccelerate: true,
});

// 分片上传
export function sliceUploadFileOnCOS(files, onUploadProgress = null, onUploadFinish = null) {
  const fileList = files.map(function(file) {
    return Object.assign(file, {
      Bucket: VUE_APP_COS_BUCKET,
      Region: VUE_APP_COS_REGION,
      Key: file.name,
      FilePath: file.path,
      Headers: {
        // 万象持久化接口，上传时持久化。例子：通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
        'Pic-Operations': '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/thumbnail/200x/"}]}'
      },
    });
  });

  return new Promise((resolve, reject) => {
    cos.uploadFiles({
      files: fileList,
      SliceSize: 1024 * 1024 * 5, // 文件大于5mb自动使用分块上传
      onProgress: function(info) {
        var percent = parseInt(info.percent * 10000) / 100;
        var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
        // console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        onUploadProgress && onUploadProgress(percent, speed)
      },
      onFileFinish: function(err, data, options) {
        // console.log(options.Key + '上传' + (err ? '失败' : '完成'));
        onUploadFinish && onUploadFinish(err, data, options)
      },
    }, function(err, data) {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    });
  })
}

// 删除文件
export function deleteFileOnCOS(filePath) {
  cos.deleteObject({
    Bucket: VUE_APP_COS_BUCKET,
    Region: VUE_APP_COS_REGION,
    Key: filePath
  }, function(err, data) {
    if (err) {
      Promise.resolve(data)
    } else {
      Promise.reject(err)
    }
  });
}


export function Base64ToBlob(urlData) {
  // 去掉url的头，并转换为byte
  const bytes = window.atob(urlData.split(',')[1])

  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {
    type: 'image/png'
  })
}

export function getCosFileUrl(cosRespObj) {
  if (cosRespObj.data !==
    undefined) {
    return `https://${cosRespObj.data.Location}`
  } else {
    return `https://${cosRespObj.Location}`
  }
}
export function getCosFileKeyByUrl(cosFileUrl) {
  const url = new URL(cosFileUrl)
  return url.pathname.substring(1)
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      // 为了兼容Safari浏览器
      time = time.replace(/ /g, 'T')
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      }
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

function filterSystemChars(fileName) {
  const result = fileName
  return result && result.replace(/[&\|\\\*\[\]\{\}\`\~\<\>\?\:\(\)\"\+\=\,\!\/\^\s%$#@\-]/g,
    '')
}

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function getCreateTime() {
  return parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
}

export function filenameWithTimestamp(originFileName) {
  const filename = filterSystemChars(originFileName)
  const timestamp = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
  const randomNum = getRandomNum(1111, 9999)
  const dotPos = filename.lastIndexOf('.')
  const name = filename.substr(0, dotPos)
  const suffix = filename.substr(dotPos, filename.length - dotPos)
  return `${name}_${timestamp}${randomNum}${suffix}`
}