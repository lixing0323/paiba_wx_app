export const ENUM_FEEDBACK_STATUS_VARS = [{
    name: true,
    value: '已处理'
  },
  {
    name: false,
    value: '未处理'
  }
]

export const ENUM_STAFF_VARS = [{
    name: 'ONE_LEVEL',
    value: '一级'
  },
  {
    name: 'TWO_LEVEL',
    value: '二级'
  }
]

export const ENUM_ROLES_VARS = [{
    name: 'ADMIN',
    value: '管理员'
  },
  {
    name: 'ACCOUNT_MANAGER',
    value: '客户经理'
  }
]

// 担保方式
export const GUARANTEE_TYPES_ENUM_VARS = [{
    name: null,
    value: '全部',
    selected: true
  },
  {
    name: 'CREDIT',
    value: '信用免担保',
    selected: false
  },
  {
    name: 'GENERAL_GUARANTEE',
    value: '保证',
    selected: false
  },
  {
    name: 'MORTGAGE',
    value: '抵押',
    selected: false
  },
  {
    name: 'PLEDGE',
    value: '质押',
    selected: false
  }
]

// 授信种类
export const CREDIT_TYPES_ENUM_VARS = [{
    name: 'HOUSE',
    value: '住房按揭'
  },
  {
    name: 'COMMERCIAL_HOUSE',
    value: '商用房按揭'
  },
  {
    name: 'CONSUME',
    value: '消费贷'
  },
  {
    name: 'BUSINESS',
    value: '经营贷 '
  }
]

// 贷款状态
export const LOAN_STATUS_ENUM_VARS = [{
    name: 'NORMAL',
    value: '正常'
  },
  {
    name: 'FOCUS',
    value: '关注'
  },
  {
    name: 'SUBPRIME',
    value: '次级'
  },
  {
    name: 'NOT_BAD',
    value: '可以'
  },
  {
    name: 'LOSS',
    value: '损失'
  }
]

// 担保人和被保人关系
export const RELATION_ENUM_VARS = [{
    name: 'CREDITOR',
    value: '债权人'
  },
  {
    name: 'DEBTOR',
    value: '债务人'
  }
]

// 是或否
export const TRUE_OR_FALSE_ENUM_VARS = [{
    name: true,
    value: '是'
  },
  {
    name: false,
    value: '否'
  }
]

// 婚姻状况
export const MARITAL_STATUS_VARS = [{
    name: 'UNMARRIED',
    value: '未婚'
  },
  {
    name: 'MARRIED',
    value: '已婚'
  },
  {
    name: 'DIVORCE',
    value: '离婚'
  },
  {
    name: 'WIDOW',
    value: '丧偶'
  }
]

// 性别
export const GENDER_VARS = [{
    name: 'MAN',
    value: '男'
  },
  {
    name: 'WOMAN',
    value: '女'
  }
]

// 存款类型
export const DEPOSIT_TYPE_VARS = [{
    name: 'CURRENT',
    value: '活期'
  },
  {
    name: 'REGULAR',
    value: '定期'
  },
  {
    name: 'CALL_DEPOSIT',
    value: '通知存款'
  },
  {
    name: 'PROTOCOL_DEPOSIT',
    value: '协议存款'
  }
]

// 存款分类
export const DEPOSIT_CATE_VARS = [{
    name: 'DEPOSIT',
    value: '存款'
  },
  {
    name: 'FINANCING',
    value: '理财'
  }
]

// 不动产共有情况
export const OWNER_SHIP_TYPE_ENUM = [{
    name: 'INDIVIDUALLY_OWNED',
    value: '单独所有'
  },
  {
    name: 'JOINTLY_OWNED',
    value: '共同所有'
  }
]
// 不动产用途
export const PURPOSE_ENUM = [{
    name: 'NORMAL_HOUSING',
    value: '普通住宅'
  },
  {
    name: 'VILLA',
    value: '别墅'
  },
  {
    name: 'COMMERCIAL_STORE',
    value: '商用门市'
  },
  {
    name: 'OFFICE',
    value: '写字间'
  },
  {
    name: 'APARTMENT',
    value: '公寓'
  },
  {
    name: 'LAND',
    value: '土地'
  },
  {
    name: 'WORKSHOP',
    value: '厂房'
  }
]

// 不动产权利性质
export const ENTITLEMENT_PROPERTIES_ENUM = [{
    name: 'SELL',
    value: '出让'
  },
  {
    name: 'TRANSFER',
    value: '划拨'
  }
]

// 朝向
export const TOWARD_ENUM = [{
    name: 'SITE_NORTH_TO_SOUTH',
    value: '坐北朝南'
  },
  {
    name: 'SITE_NORTHEAST_TO_SOUTHWEST',
    value: '坐东北朝西南'
  },
  {
    name: 'SITE_EAST_TO_WEST',
    value: '坐东朝西'
  },
  {
    name: 'SITE_SOUTHEAST_TO_NORTHWEST',
    value: '坐东南朝西北'
  },
  {
    name: 'SITE_SOUTH_TO_NORTH',
    value: '坐南朝北'
  },
  {
    name: 'SITE_SOUTHWEST_TO_NORTHEAST',
    value: '坐西南朝东北'
  },
  {
    name: 'SIT_WEST_TO_EAST',
    value: '坐西朝东'
  },
  {
    name: 'SITE_NORTHWEST_TO_SOUTHEAST',
    value: '坐西北朝东南'
  }
]

// 组织形式
export const ORGANIZATION_TYPE_ENUM = [{
    name: 'COMPANY',
    value: '公司制企业'
  },
  {
    name: 'PARTNER',
    value: '合伙企业'
  },
  {
    name: 'SOLE',
    value: '自然人独资企业'
  }
]

export const CUSTOMER_REQUIREMENT_TYPE_ENUM_VARS = [{
    name: 'LOAN',
    value: '贷款'
  },
  {
    name: 'FINANCIAL',
    value: '理财'
  }
]

// 客户需求状态
export const CUSTOMER_REQUIREMENT_STATUS_ENUM_VARS = [{
    name: 'PROCESSED',
    value: '已处理'
  },
  {
    name: 'UN_PROCESSED',
    value: '待处理'
  }
]

// 消息状态
export const MESSAGE_STATUS_ENUM_VARS = [{
    name: '',
    value: '全部'
  },
  {
    name: 'READ',
    value: '已读'
  },
  {
    name: 'UNREAD',
    value: '未读'
  }
]

// 产品管理-风险等级
export const LEVEL_RISK_ENUM_VARS = [{
    value: '全部',
    selected: true
  },
  {
    name: 'R0',
    value: '安逸型',
    selected: false
  },
  {
    name: 'R1',
    value: '审慎型',
    selected: false
  },
  {
    name: 'R2',
    value: '稳健型',
    selected: false
  },
  {
    name: 'R3',
    value: '增长型',
    selected: false
  },
  {
    name: 'R4',
    value: '进取型',
    selected: false
  },
  {
    name: 'R5',
    value: '激进型',
    selected: false
  }
]
