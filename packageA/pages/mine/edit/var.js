import {
  getPersonalInfoStorage,
  setPersonalInfoStorage
} from '@/store/localStorage.js'

export function getInformation() {
  return getPersonalInfoStorage() || {}
}

export function saveInformation(info) {
  setPersonalInfoStorage(info)
}

export function clearInfomation() {
  setPersonalInfoStorage({})
}

// 保存紧急联系人信息
export function saveEmergencyContact(form) {
  const info = getInformation()
  info.contactName = form.name.trim()
  info.contactRelation = form.relation
  info.contactPhone = form.phone
  info.contactAddress = form.address
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
  info.mailName = form.name.trim()
  info.mailRegion = form.region
  info.mailPhone = form.phone
  info.mailAddress = form.address
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
  info.eduSchool = form.school
  info.eduDate = form.date
  info.eduSpeciality = form.speciality
  info.eduEducation = form.education
  info.eduExperience = form.experience
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
  info.workCompany = form.company
  info.workIndustry = form.industry
  info.workDate = form.date
  info.workDepartment = form.department
  info.workJob = form.job
  info.workContent = form.content
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