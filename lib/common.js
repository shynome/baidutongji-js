const { gzip, gunzip } = require('zlib')

/**
 * @param {any} data
 * @returns {Promise<Buffer>}
 */
exports.GZEncode = async (data)=>{
  data = JSON.stringify(data)
  return new Promise((rl,rj)=>{
    gzip(data,{ level: 9 },(err,res)=>{
      if(err)return rj(err);
      rl(res)
    })
  })
}

/**
 * @param {any} data
 */
exports.GZDecode = async (data)=>{
  data = await exports.ungzip(data)
  return JSON.parse(data)
}

/**
 * @param {*} data
 */
exports.ungzip = async (data)=>{
  return new Promise((rl,rj)=>{
    gunzip(data,{ level: 9 },(err,res)=>{
      if(err)return rj(err);
      rl(res)
    })
  })
}

const crypto = require("crypto")
const constants = require("constants")
const pubkey = {
  key: require("./index").pubkey,
  padding: constants.RSA_PKCS1_PADDING,
}
/**
 * @param {Buffer} data
 */
exports.EnCryptData = async (data)=>{
  let buf = new Buffer([])
  for(let i=0; i < data.length; ){
    buf = Buffer.concat([
      buf,
      crypto.publicEncrypt(pubkey, data.slice(i,Math.min(i+=117,data.length))),
    ])
  }
  return buf
}

/**
 * @param {Buffer} data
 */
exports.ParseResp = async (data)=>{
  
}
