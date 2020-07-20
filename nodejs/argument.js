var args = process.argv;
console.log(args);

if(args[2] === 'a'){
    console.log('A');
}
else{
    console.log('B');
}

console.log("args",args[2]);