var fs = require('fs')
fs.readFile('./cities.json', 'utf-8', function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log('成功从cities.json读取数据')
   const parseData = JSON.parse(data)
   console.log('ss')
   function reset (oneData) {
    return  oneData.map(item => {
       const obj = {}
       obj.value = item.code
       obj.label = item.name
       if (item.childs && item.childs.length) {
         obj.children = reset(item.childs)
       } else {
         obj.children = []
       }
       return obj
     })
   }
   const finalData = reset(parseData)
   fs.writeFile('./output.json', JSON.stringify(finalData), function(err) {
     if (err) {
        console.log(err)
     } else {
        console.log('成功写入output.json')
     }
   })
  }
})
