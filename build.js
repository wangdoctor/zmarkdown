const marked = require('marked');
const fs = require('fs');
const path = require('path');
//情况文件夹
var emptyDir = function(paths) {
    var files = [];
    if( fs.existsSync(paths) ) {
        files = fs.readdirSync(paths);
        files.forEach(function(file,index){
            var curPath = paths + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                emptyDir(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
            fs.rmdirSync(curPath);
        });
         
    }
};

//编译md文档
function  explorer(paths){
    fs.readdir(paths, function(err, files){
        //err 为错误 , files 文件名列表包含文件夹与文件
        if(err){
            console.log('error:\n' + err);
            return;
        }
        files.forEach(function(file){
            fs.stat(paths + '/' + file, function(err, stat){
                if(err){console.log(err); return;}
                if(stat.isDirectory()){					
                    // 如果是文件夹遍历
                    explorer(paths + '/' + file);
                }else{
                    //读取准备好的html模板文件
                    fs.readFile('./index.html','utf8',(err,template)=>{
                        if(err){
                        console.log('读取模板文件失败！',err);
                        }else{
                        // 验证文件夹是否存在
                        fs.exists(paths.replace('page','doc').replace('.','web'), function(exists) {
                            if (!exists) {
                                fs.mkdir(paths.replace('page','doc').replace('.','web'));
                            }
                        });
                        fs.readFile(paths + '/' + file, "utf8", (err,data) => {
                            if(err) {console.log(err);return;}
                            let html =  marked(data);
                            //因为md文件转换成HTML 没有body等标签，需替换添加
                            template = template.replace("{{{content}}}", html).replace("###"+file," activity");
                            // 判断是否选择当前目录
                            if (template.indexOf(paths.substring(paths.lastIndexOf('/')+1,paths.length))>-1) {
                              template=template.replace("###"+paths.substring(paths.lastIndexOf('/')+1,paths.length)," class='baas-open' ");  
                            }
                            //写入html
                            fs.writeFile(path.join(paths.replace('page','doc').replace('.','web'), file.split('.')[0]+".html"), template, "utf8",function (err, data) {
                                // fs.writeFile('writeMe.txt', data);
                            });
                            console.log(paths + '/' + file+'-----success!');
                        });
                        }
                    });
                }				
            });
        });

    });
}
//emptyDir('./doc');
explorer('./page');

