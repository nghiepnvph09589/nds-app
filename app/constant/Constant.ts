const SCREEN_ROUTER_APP = {
  PRODUCT: 'PRODUCT',
  NOTIFICATION: 'NOTIFICATION',
  HOME: 'HOME',
  USER: 'USER',
  CREATE_POST: 'POST',
  LOCATION: 'LOCATION',
  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
  LIST_SUPPORT: 'LIST_SUPPORT',
  CONTACT: 'CONTACT',
  TERMS: 'TERMS',
  CHANGE_PASS: 'CHANGE_PASS',
  ADDRESS_MAP: 'ADDRESS_MAP',
  CREATE_SUPPORT: 'CREATE_SUPPORT',
  MANAGE_LIST_SUPPORT: 'MANAGE_LIST_SUPPORT',
  LIST_SUPPORT_DETAIL: 'LIST_SUPPORT_DETAIL',
  LIST_POST: 'LIST_POST',
  SUPPORT_DETAIL: 'SUPPORT_DETAIL',
  DETAIL_POST: 'DETAIL_POST',
  DETAIL_SUPPORT_MANAGE: 'DETAIL_SUPPORT_MANAGE',
  MANAGE_LIST_POST: 'MANAGE_LIST_POST',
  EDIT_SUPPORT_MANAGE: 'EDIT_SUPPORT_MANAGE',
  UPDATE_SUPPORT_MANAGE: 'UPDATE_SUPPORT_MANAGE',
  BANNER_DETAIL: 'BANNER_DETAIL',
  UPDATE_POST: 'UPDATE_POST',
  BANK_INFO: 'BANK_INFO',
  UPDATE_BANK: 'UPDATE_BANK',
  HUMAN_ADDRESS: 'HUMAN_ADDRESS',
  FILTER: 'FILTER',
}

const MAIN_TAB = {
  HOME: 'HOME',
  HUMAN_ADDRESS: 'HUMAN_ADDRESS',
  CREATE_POST: 'CREATE_POST',
  USER: 'USER',
  NOTIFICATION: 'NOTIFICATION',
}

const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NOTFOUND: 404,
  BAD_REQUEST: 400,
  SERVER: 500,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  FORBIDDEN: 403,
  BAD_GATEWAY: 502,
  NOT_EXISTED: 405,
}

const SCREEN_ROUTER_AUTH = {
  SPLASH: 'SPLASH',
  LOGIN: 'LOGIN',
  LOGIN_STEP_2: 'LOGIN_STEP_2',
  REGISTER: 'REGISTER',
  FORGET_PASSWORD: 'FORGOT_PASSWORD',
  FORGET_PASSWORD_STEP_2: 'FORGET_PASSWORD_STEP_2',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  OTP: 'OTP',
}

const SCREEN_ROUTER_INTRODUCE = {
  INTRODUCE1: 'INTRODUCE1',
}

const SCREEN_ROUTER = {
  SPLASH: 'SPLASH',
  AUTH: 'AUTH',
  CREATE_POST: 'CREATE_POST',
  MAIN: 'MAIN',
  INTRODUCE: 'INTRODUCE',
}
const MEDIA_TYPE = {
  IMAGE: 1,
  VIDEO: 2,
}

export const ONESIGNAL_APP_ID = 'db34fa73-c810-494c-b274-08ee6202a7ad'

export const GOONG_HOST = 'https://rsapi.goong.io/'

export const api_key = '3yJu457TLe2c9bvAuzohv7ms6ds65uPRUnG587bi'

const STATUS_TYPE = {
  WAIT_CONFIRM: 2, //chờ xác nhận
  EDIT: 1, //chỉnh sửa
  COMPLETE: 3, //Hoàn thành
  DENY: 0, //Tùe chối
}

export const ROOT_STACK = {
  MAIN_APP: 'MAIN_APP',
}

export const APP_SLICE = {
  SWITCH: 'switchNavigatorReducer',
}

const DEFAULT_PARAMS = {
  PAGE: 1,
  LIMIT: 10,
}
export const NOTIFICATION_TYPE = {
  DONATE: 1, // ủng hộ
  POST: 2, // bài đăng
  NEWS_BANNER: 3, // tin tức
}
export const STATUS_SUPPORT = {
  WAITING: 2, //chờ duyệt
  APPROVE: 3, //đã duyệt
  EDIT: 1, //chỉnh sửa
  SUCCESS: 4, //hoàn thành
  CANCEL: 0, //từ chối
}

export const CONTACT = {
  PHONE: '02143842700 ',
  FACEBOOK: 'https://www.facebook.com/nguyen.vannghiep.90/',
  ZALO: '0368138670',
}

const PHONE_REGEX =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/

const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
const PASSWORD_REGEX = /^.{8,20}$/

const ROLE = {
  ADMIN: 1, // admin
  OFFICER_PROVINCE: 2, // cán bộ địa phương cấp tỉnh
  OFFICER_DISTRICT: 3, // cán bộ địa phương cấp huyện
  OFFICER_WARD: 4, // cán bộ địa phương cấp xã
  CUSTOMER: 5, // khách hàng
}

export const STATUS_SUPPORT_DETAIL = {
  DENY: 0, //// Từ chối
  CUSTOMER_SUPPORT: 1, //// Khách HÀNG / NGƯỜI DÙNG ỦNG HỘ
  DISTRICT_ACCEPT: 2, //// HUYỆN ỦNG HỘ
  PROVINCE_ACCEPT: 3, //// TỈNH DUYỆT
  UPDATE_SUPPORT: 4, // đăng ảnh
}

const NAME_REGEX =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/g
export {
  DEFAULT_PARAMS,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
  SCREEN_ROUTER_AUTH,
  API_STATUS,
  PHONE_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  MAIN_TAB,
  MEDIA_TYPE,
  ROLE,
  STATUS_TYPE,
  SCREEN_ROUTER_INTRODUCE,
}
