const COMMON_BUSINESS = [{
    label: '注册日期',
    prop: 'registeredDate'
  },
  {
    label: '经营范围',
    prop: 'businessScope',
    direction: 'column'
  },
  {
    label: '注册地址',
    prop: 'registeredAddressFull',
    direction: 'column'
  },
  {
    label: '实际经营地址',
    prop: 'addressFull',
    direction: 'column'
  },
  {
    label: '经营地址是否为租赁',
    prop: 'isRent'
  },
  {
    label: '面积',
    prop: 'rentArea'
  },
  {
    label: '年租金',
    prop: 'rent'
  },
  {
    label: '库房地址',
    prop: 'warehouseAddress',
    direction: 'column'
  },
  {
    label: '面积',
    prop: 'warehouseArea'
  }
]

export const TITLE_REPORT_BUSINESS = [{
    label: '公司名称',
    prop: 'name'
  },
  ...COMMON_BUSINESS,
  {
    label: '上游客户',
    prop: 'upCustomers'
  },
  {
    label: '下游客户',
    prop: 'downCustomers'
  }
]

export const TITLE_CUSTOMER_BUSINESS = [{
    label: '公司名称',
    prop: 'name',
    direction: 'column'
  },
  {
    label: '统一信用社会代码',
    prop: 'unifyCode',
    direction: 'column'
  },
  {
    label: '主营业务',
    prop: 'mainBusiness',
    direction: 'column'
  },
  {
    label: '组织形式',
    prop: 'organizationType',
  },
  ...COMMON_BUSINESS,
  {
    label: '租金',
    prop: 'warehouseRent'
  },
  {
    label: '上游客户',
    prop: 'upCustomers',
    direction: 'column'
  },
  {
    label: '下游客户',
    prop: 'downCustomers',
    direction: 'column'
  },
  {
    label: '是否为主营',
    prop: 'isMainBusiness'
  }
]

export const TITLE_DEPOSIT = [
  {
    label: '存款分类',
    prop: 'depositCate'
  },
  {
    label: '存款类型',
    prop: 'depositType'
  },
  {
    label: '金额',
    prop: 'amount'
  },
  {
    label: '利率',
    prop: 'rate'
  }
]

export const TITLE_FINANCIAL = [
  {
    label: '存款分类',
    prop: 'depositCate'
  },
  {
    label: '金额',
    prop: 'amount'
  },
  {
    label: '到期日',
    prop: 'expiringDate'
  },
  {
    label: '预期收益率',
    prop: 'expectedYield'
  }
]


export const TITLE_IMMOVABLE_ONE = [
 {
     label: '不动产产权证号',
     prop: 'certificateNo'
   },
   {
     label: '名称',
     prop: 'name'
   },
   {
     label: '权属人',
     prop: 'owner'
   },
   {
     label: '共有情况',
     prop: 'ownershipType'
   }
]

export const TITLE_IMMOVABLE_TWO = [
  {
    label: '不动产用途',
    prop: 'purpose'
  },
  {
    label: '不动产地址',
    prop: 'registeredAddressFull',
    direction: 'column'
  },
  {
    label: '购买时间',
    prop: 'purchaseTime'
  },
  {
    label: '买入金额',
    prop: 'purchaseAmount'
  },
  {
    label: '装修情况',
    prop: 'decorationState'
  },
  {
    label: '房屋所在楼层',
    prop: 'storey'
  },
  {
    label: '总层数',
    prop: 'totalFloor'
  },
  {
    label: '建成年代',
    prop: 'buildAt'
  },
  {
    label: '权利性质',
    prop: 'entitlementProperties'
  },
  {
    label: '是否电梯房',
    prop: 'isContainElevator'
  },
  {
    label: '是否学区房',
    prop: 'isSchoolDistrictHousing'
  },
  {
    label: '学区地址',
    prop: 'schoolDistrictAddress'
  },
  {
    label: '面积',
    prop: 'area'
  },
  {
    label: '朝向',
    prop: 'toward'
  },
  {
    label: '抵质押率',
    prop: 'resistPressureRate'
  },
  {
    label: '评估单价',
    prop: 'evaluationUnitPrice'
  },
  {
    label: '评估总价',
    prop: 'evaluationTotalPrice'
  },
  {
    label: '评估公司名称',
    prop: 'evaluationCompanyName'
  }
]

export const TITLE_MOVABLE = [{
    label: '名称',
    prop: 'name'
  },
  {
    label: '所有人',
    prop: 'owner'
  },
  {
    label: '价值',
    prop: 'value'
  }
]

export const TITLE_CREDIT_MY = [
  {
    label: '银行名称',
    prop: 'bankName'
  },
  {
    label: '发放金额',
    prop: 'creditBalance'
  },
  {
    label: '发放日期',
    prop: 'loanDate'
  },
  {
    label: '授信余额',
    prop: 'loanAmount'
  },
  {
    label: '到期日期',
    prop: 'dueDate'
  },
  {
    label: '还款日',
    prop: 'repaymentDay'
  },
  {
    label: '担保方式',
    prop: 'guaranteeType'
  },
  {
    label: '授信种类',
    prop: 'creditType'
  },
  {
    label: '是否为本笔抵押物贷款',
    prop: 'isPawn'
  },
  {
    label: '实际贷款用途',
    prop: 'usedFor'
  }
]

export const TITLE_CREDIT_COMPANY = [
  {
    label: '关联公司',
    prop: 'companyName'
  },
  ...TITLE_CREDIT_MY
]

export const TITLE_CREDIT_CARD = [
  {
    label: '授信银行',
    prop: 'bankName'
  },
  {
    label: '授信额度',
    prop: 'creditLine'
  },
  {
    label: '已用额度',
    prop: 'usedCredit'
  },
  {
    label: '近六个月平均使用额度',
    prop: 'averageUsedCredit'
  }
]

export const TITLE_GUARANTEE = [
  {
    label: '保证人',
    prop: 'guarantor'
  },
  {
    label: '被保证人',
    prop: 'warrantee'
  },
  {
    label: '保证人与被保证人关系',
    prop: 'relation'
  },
  {
    label: '担保金额',
    prop: 'amount'
  },
  {
    label: '贷款状态',
    prop: 'loanStatus'
  },
  {
    label: '担保方式',
    prop: 'guaranteeType'
  }
]
