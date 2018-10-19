require("dotenv").load()
process.env.UUID = require("uuid/v4")()

const got = require("got")
const common = require('./common')

/**
 * @typedef {Object} Config
 * @property {string} Token
 * @property {string} UUID
 * @property {string} user
 * @property {string} pass
 */

const LOGIN_URL = "https://api.baidu.com/sem/common/HolmesLoginService"
const API_URL_BASE = 'https://api.baidu.com/json/tongji/v1/ReportService'
const API_URL = {
  getSiteList: API_URL_BASE+'/getSiteList',
  getData:     API_URL_BASE+'/getData',
}
const ACCOUNT_TYPE = 1
// 超过这个时间的话就重新登录一次, 刷新 st(会话id)
const UserSTAliveTime = 10*60*1000

exports.User = class User {

  /**
   * 
   * @param {Config} config 
   */
  // @ts-ignore
  constructor(config=["Token","UUID","user","pass"].reduce((t,k)=>(t[k]=process.env[k],t),{})){
    this.config = config
    this.headers = {
      'UUID': config.UUID,
      'account_type': ACCOUNT_TYPE,
      'Content-Type': 'data/gzencode and rsa public encrypt;charset=UTF-8'
    }
    this.ucid = 0
    this.st = ''
    this.lastRequestTime = 0
    this.loginPromise = null
    this.requestPromise = null
    if( !isNaN(Number(process.env.ucid)) && process.env.st ){
      this.ucid = Number(process.env.ucid)
      this.st = process.env.st
    }
  }
  
  /**
   * @param {string} url 
   * @param {any} data 
   */
  async post(url, data){
    let gzipData = await common.GZEncode(data)
    let postData = await common.EnCryptData(gzipData)
    let res = await got.post(url,{ body: postData, headers: this.headers, encoding: null })
    let body = /**@type {Buffer} */(/**@type {any} */(res.body))
    let [ code1, code2 ] = body.slice(0,8)
    if( (code1+code2)>0 ){
      throw new Error(`状态码不对`)
    }
    return await common.GZDecode(body.slice(8))
  }
  
  async preLogin (){
    let data = {
      'username': this.config.user,
      'token': this.config.Token,
      'functionName': 'preLogin',
      'uuid': this.config.UUID,
      'request': {
        'osVersion': 'windows',
        'deviceType': 'pc',
        'clientVersion': '1.0',
      }
    }
    /**
     * @type { {needAuthCode: boolean } }
     */
    let res = await this.post(LOGIN_URL, data)
    return res
  }

  async Login(){
    if(this.loginPromise!==null){
      return this.loginPromise
    }else{
      this.loginPromise = this._Login()
      this.loginPromise.then(()=>{
        this.loginPromise = null
      })
      return this.loginPromise
    }
  }
  
  async _Login(){
    let { needAuthCode } = await this.preLogin()
    if( needAuthCode ){
      throw new Error("需要验证码的情况未处理")
    }
    let data = {
      'username': this.config.user,
      'token': this.config.Token,
      'functionName': 'doLogin',
      'uuid': this.config.UUID,
      'request': {
        'password': this.config.pass
      }
    }

    /**
     * @typedef {Object} LoginResp
     * @property {number} retcode
     * @property {string} retmsg
     * @property {number} ucid
     * @property {string} st
     * @property {number} istoken
     * @property {number} setpin
     */

    /**@type {LoginResp} */
    let res = await this.post(LOGIN_URL,data)
    if ( res.retcode != 0) {
      this.loginError = new Error(JSON.stringify(res,null,2))
      throw this.loginError
    }
    this.ucid = res.ucid
    this.st = res.st
    console.log(`登录成功:\n`, JSON.stringify({ ucid: this.ucid, st: this.st }))
    return this
  }
  
  /**
   * 
   * @param {string} url
   * @param {*} [data]
   */
  async request(url, data){
    if(this.requestPromise!==null){
      return this.requestPromise
    }else{
      this.requestPromise = this._request(url,data)
      this.requestPromise.then(()=>{
        this.requestPromise = null
      })
      return this.requestPromise
    }
  }
  
  /**
   * 
   * @param {string} url
   * @param {*} [data]
   */
  async _request(url, data){

    let now = Date.now()
    if( !this.lastRequestTime || (now - this.lastRequestTime > UserSTAliveTime) ){
      await this.Login()
    }
    this.lastRequestTime = now

    let postData = {
      'header': {
        'username': this.config.user, 'password': this.st, 'token': this.config.Token,
        'account_type': ACCOUNT_TYPE, 
      },
      ...(data?{ body:data }:{})
    }
    return got.post(url,{ body: postData, headers: this.headers, json: true })
  }
  
  /**
   * @returns {Promise<{list:any}>}
   */
  async getSiteList(){
    let res = await this.request(API_URL.getSiteList)
    return User.FormatApiResp(res.body)
  }

  /**
   * @param {baidutongji_v1.query_params<baidutongji_v1.query_params_keys>} query_params 
   * @return {Promise<{result:baidutongji_v1.SiteFormat}>}
   */
  async getdata(query_params){
    if ( typeof query_params.metrics === 'object' ){
      // @ts-ignore
      query_params.metrics = Object.keys(query_params.metrics).filter(k=>query_params.metrics[k]===1).join(',')
    }
    let res = await this.request(API_URL.getData,query_params)
    let data = /**@type {baidutongji_v1.Resp<{result:any}>} */(res.body)
    return User.FormatApiResp(data)
  }
  /**
   * @template T
   * @param {baidutongji_v1.Resp<T>} resp 
   * @returns {T}
   */
  static FormatApiResp(resp){
    if(resp.header.failures.length){
      throw new Error(resp.header.failures.map(v=>JSON.stringify(v,null,2)).join('\n'))
    }
    return resp.body.data[0]
  }
} 