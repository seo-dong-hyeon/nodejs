var fs = require('fs');

/* 동기 */
console.log('A');
console.log(fs.readFileSync('sync/sample.txt','utf8'));
console.log('C');
// A B C

/* 비동기 */
console.log('A');
fs.readFile('sync/sample.txt','utf8',function(err,result){
    console.log(result);
});
console.log('C');
// A C B