const SCREEN_ROUTER_APP = {
  PRODUCT: 'PRODUCT',
  NOTIFICATION: 'NOTIFICATION',
  HOME: 'HOME',
  USER: 'USER',
  CREATE_POST: 'CREATE_POST',
  LOCATION: 'LOCATION',
  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
  LIST_SUPPORT: 'LIST_SUPPORT',
  CONTACT: 'CONTACT',
  TERMS: 'TERMS',
  CHANGE_PASS: 'CHANGE_PASS',
  ADDRESS_MAP: 'ADDRESS_MAP',
}

const MAIN_TAB = {
  HOME: 'HOME',
  LOCATION: 'LOCATION',
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

const SCREEN_ROUTER_CREATE_POST = {
  CREATE_POST: 'CREATE_POST',
  ADDRESS_MAP: 'ADDRESS_MAP',
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

const SCREEN_ROUTER = {
  SPLASH: 'SPLASH',
  AUTH: 'AUTH',
  CREATE_POST: 'CREATE_POST',
  MAIN: 'MAIN',
}
const MEDIA_TYPE = {
  IMAGE: 1,
  VIDEO: 2,
}

export const ROOT_STACK = {
  MAIN_APP: 'MAIN_APP',
}

export const APP_SLICE = {
  SWITCH: 'switchNavigatorReducer',
}

const DEFAULT_PARAMS = {
  PAGE: 1,
  LIMIT: 24,
}

export const CONTACT = {
  PHONE: '0368138670',
  FACEBOOK: 'https://www.facebook.com/nguyen.vannghiep.90/',
  ZALO: '0368138670',
}

const PHONE_REGEX =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/

const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
const PASSWORD_REGEX = /^.{8,20}$/

const NAME_REGEX =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/g
export {
  DEFAULT_PARAMS,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
  SCREEN_ROUTER_AUTH,
  SCREEN_ROUTER_CREATE_POST,
  API_STATUS,
  PHONE_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  MAIN_TAB,
  MEDIA_TYPE,
}
