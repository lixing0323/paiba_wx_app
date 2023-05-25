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
export function saveEducationExperience() {
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
    info.speciality = speciality
  }
  if (experience) {
    info.experience = experience
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