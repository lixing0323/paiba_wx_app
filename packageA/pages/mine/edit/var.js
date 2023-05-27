import {
  getPersonalInfoStorage,
  setPersonalInfoStorage
} from '@/store/localStorage.js'

export function _trim(value) {
  if (typeof value === 'string' && !value.length) {
    value = value.trim()
  }
  return value
}

export function getInformation() {
  return getPersonalInfoStorage() || {}
}

export function saveInformation(info) {
  setPersonalInfoStorage(info)
}

export function clearInfomation() {
  setPersonalInfoStorage({})
}

// 保存头像
export function saveAvatar(avatar) {
  const info = getInformation()
  info.avatarUrl = avatar
  saveInformation(info)
}

// 保存紧急联系人信息
export function saveEmergencyContact(form) {
  const info = getInformation()
  info.contactName = _trim(form.name)
  info.contactRelation = _trim(form.relation)
  info.contactPhone = form.phone
  info.contactAddress = _trim(form.address)
  saveInformation(info)
}

export function getEmergencyContact() {
  const info = getInformation()
  return {
    name: info.contactName,
    relation: info.contactRelation,
    phone: info.contactPhone,
    address: info.contactAddress
  }
}

// 保存通讯地址信息
export function saveMailAddress(form) {
  const info = getInformation()
  info.mailName = _trim(form.name)
  info.mailRegion = form.region
  info.mailPhone = form.phone
  info.mailAddress = _trim(form.address)
  saveInformation(info)
}

export function getMailAddress() {
  const info = getInformation()
  return {
    name: info.mailName,
    region: info.mailRegion,
    phone: info.mailPhone,
    address: info.mailAddress
  }
}

// 保存教育经历
export function saveEducationExperience(form) {
  const info = getInformation()
  info.eduSchool = _trim(form.school)
  info.eduDate = form.date
  info.eduSpeciality = _trim(form.speciality)
  info.eduEducation = form.education
  info.eduExperience = _trim(form.experience)
  saveInformation(info)
}

export function saveEducationExperienceJson({
  school,
  speciality,
  experience
}) {
  const info = getInformation()
  if (school) {
    info.eduSchool = school
  }
  if (speciality) {
    info.eduSpeciality = speciality
  }
  if (experience) {
    info.eduExperience = experience
  }
  saveInformation(info)
}

export function getEducationExperience() {
  const info = getInformation()
  return {
    school: info.eduSchool,
    date: info.eduDate,
    speciality: info.eduSpeciality,
    education: info.eduEducation,
    experience: info.eduExperience
  }
}

// 保存工作经历
export function saveWorkExperience(form) {
  const info = getInformation()
  info.workCompany = _trim(form.company)
  info.workIndustry = _trim(form.industry)
  info.workDate = form.date
  info.workDepartment = _trim(form.department)
  info.workJob = _trim(form.job)
  info.workContent = _trim(form.content)
  saveInformation(info)
}

export function saveWorkExperienceJson({
  company,
  industry,
  date,
  department,
  job,
  content
}) {
  const info = getInformation()
  if (company) {
    info.workCompany = company
  }
  if (industry) {
    info.workIndustry = industry
  }
  if (department) {
    info.workDepartment = department
  }
  if (job) {
    info.workJob = job
  }
  saveInformation(info)
}

export function getWorkExperience() {
  const info = getInformation()
  return {
    company: info.workCompany,
    industry: info.workIndustry,
    date: info.workDate,
    department: info.workDepartment,
    job: info.workJob,
    content: info.workContent
  }
}

// 保存我的作品
export function saveMyCreation(form) {
  const info = getInformation()
  info.myCreationImages = form.images
  info.myCreationVideos = form.videos
  saveInformation(info)
}

export function getMyCreation() {
  const info = getInformation()
  return {
    images: info.myCreationImages,
    videos: info.myCreationVideos
  }
}

// 保存我的成就
export function saveMyAchievement(form) {
  const info = getInformation()
  info.myAchievementContent = form.content
  saveInformation(info)
}

export function getMyAchievement() {
  const info = getInformation()
  return {
    content: _trim(info.myAchievementContent)
  }
}

// 保存自我评价
export function saveSelfEvaluation(form) {
  const info = getInformation()
  info.selfEvaluationContent = form.content
  saveInformation(info)
}

export function getSelfEvaluation() {
  const info = getInformation()
  return {
    content: _trim(info.selfEvaluationContent)
  }
}

// 作品描述
export function getCreationDescription(images, videos) {
  let imageCnt = 0
  let videoCnt = 0
  if (images) {
    imageCnt = images.length
  }
  if (videos) {
    videoCnt = videos.length
  }
  if (imageCnt || videoCnt) {
    const imageStr = imageCnt ? `${imageCnt}张照片 ` : ''
    const videoStr = videoCnt ? ` ${videoCnt}个视频` : ''
    return `共${imageStr}${videoStr}`
  }
}