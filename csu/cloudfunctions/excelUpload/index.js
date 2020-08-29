const cloud = require('wx-server-sdk')
cloud.init({
  env: "energycsu-x8fn6"
})
var xlsx = require('node-xlsx');

const db = cloud.database();

exports.main = async(event, context) => {
  
  let {
    fileID,
    activity_name
  } = event
  //1,通过fileID下载云存储里的excel文件
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent

  const tasks = [] //用来存储所有的添加数据操作

  console.log("开始解析");

  //2,解析excel文件里的数据
  var sheets = xlsx.parse(buffer); //获取到所有sheets
  sheets.forEach(function(sheet) {
    console.log(sheet['name']);
    for (var rowId in sheet['data']) {
      console.log(rowId);
      var row = sheet['data'][rowId]; //第几行数据
      if (rowId > 0 && row) { //第一行是表格标题，所有我们要从第2行开始读
        //3，把解析到的数据存到excelList数据表里
        
        const res = await db.collection('User').where({uid:row[0]}).get();

        

        const promise = db.collection('Score')
          .add({
            data: {
             _openid: res.result.data[0]._openid, 
              score: row[1], 
              user_id: row[0],
              time: new Date().getTime(),
              activity_name: activity_name
            }
          })
        tasks.push(promise)
        
      }
    }
  });

  // 等待所有数据添加完成
  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function(err) {
    return err
  })
  return result
}