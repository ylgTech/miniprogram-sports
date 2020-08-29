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
    let dataCVS = '参赛名单.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['user_id']; //表属性
    alldata.push(row);
    //const db = cloud.database();

    for (let key in userdata) {
      //let user_name;
      let user_id = userdata[key].user_id;
      /*
      db.collection('User').where({uid:user_id})
      .get({
        success:  
        function(res){user_name = res.data[0].nickName}
          //{console.log(res.data);}
      });
      */
      let arr = [];
      arr.push(user_id);
      // arr.push(user_name);
      
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "参赛名单",
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