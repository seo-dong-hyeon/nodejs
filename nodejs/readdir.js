var testFolder = './data';
var fs = require('fs');

// 현재 디렉토리 기준으로 원하는 위치의 파일 목록 찾기
fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})

// node readdir.js