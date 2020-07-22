var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateList(filelist) {
  var list = '<ol>';
  for (index in filelist) {
    list = list + `<li><a href="/?id=${filelist[index]}">${filelist[index]}</a></li>`;
  }
  list += '</ol>';

  return list;
}

function templateHTML(title, list, description){
  return `<!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
           <h1><a href="/">WEB</a></h1>
           ${list}
           <a href="/create">create</a>
           <h2>${title}</h2>
           <p>${description}</p>
          </body>
          </html>
           `
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query; 
    var pathname = url.parse(_url,true).pathname; // query string을 제외한 path
    var title = queryData.id;
    
    console.log(url.parse(_url,true));

    if(pathname === '/'){
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${title}`,'utf8',function(err,description){
          if(title === undefined){
            title = 'Welcome';
            description = "hello nodejs";
          }
        
          var list = templateList(filelist);
          var template = templateHTML(title,list,description);

          response.writeHead(200);
          response.end(template); 
        })
      });
    }
    else if (pathname === '/create') {
      fs.readdir('./data', function (error, filelist) {
        title = "Web-create";
        description = `<form action="http://localhost:3000/create_process" method="POST">
         <p><input type="text" name="title" placeholder="title"></p>
         <textarea name="description" placeholder="descriptions"></textarea>
         <input type="submit">
         </form>`;

        var list = templateList(filelist);
        var template = templateHTML(title, list, description);

        response.writeHead(200);
        response.end(template);
      });
    }
    else if(pathname === '/create_process'){
      var body = '';
      request.on('data',function(data){
        body = body + data;
      });

      request.on('end',function(){
        var ps = qs.parse(body);
        const { title, description } = ps;

        // 파일 저장 성공 시 callback 호출
        fs.writeFile(`./data/${title}`,description,'utf8',function(err){
          response.writeHead(302, {Location: `/?id=${title}`}); // redirection
          response.end(); 
        })
      });
    }
    else{
      response.writeHead(404);
      response.end('Not Found');
    }  
});
app.listen(3000);