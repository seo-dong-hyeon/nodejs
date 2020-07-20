var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query; 
    var pathname = url.parse(_url,true).pathname; // query string을 제외한 path
    var title = queryData.id;
    
    console.log(url.parse(_url,true));
    console.log(title);
  
    if(pathname === '/'){
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${title}`,'utf8',function(err,description){
          if(title === undefined){
            title = 'Welcome';
            description = "hello nodejs";
          }
          /*<ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
           </ol>*/
          var list = '<ol>';
          for(index in filelist){
            list = list + `<li><a href="/?id=${filelist[index]}">${filelist[index]}</a></li>`;
          }
          list += '</ol>';

          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
           <h1><a href="/">WEB</a></h1>
           ${list}
           <h2>${title}</h2>
           <p>${description}</p>
          </body>
          </html>
           `
          response.writeHead(200);
          response.end(template); 
        })
      });
    }
    else{
      response.writeHead(404);
      response.end('Not Found');
    }  
});
app.listen(3000);