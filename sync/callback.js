const a = function(){
    console.log('fuck');
}

function slowF(callback){
    callback();
}

slowF(a);