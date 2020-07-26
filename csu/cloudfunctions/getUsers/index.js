// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "energycsu-x8fn6"
})

// 云函数入口函数
exports.main = async(event, context) => {
  return await cloud.database().collection('match_par').get();
}