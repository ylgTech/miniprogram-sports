// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "energycsu-x8fn6"
})

//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {userdata} = event
    
    //1,定义excel表格名
    let dataCVS = 'test.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['id', '头像地址','昵称', '号码','url']; //表属性
    alldata.push(row);

    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key]._id);
      arr.push(userdata[key]._avatarurl);
      arr.push(userdata[key]._name);
      arr.push(userdata[key]._num);
      arr.push(userdata[key]._url);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}