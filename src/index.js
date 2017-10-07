/**
 * Created by yifei.tang on 2017/10/01.
 */
'use strict'

var fs = require('fs');

//fd为fs.open的返回值，file为目录下历次遍历的文件/目录，num为缩进次数计数器
async function preCalc(fd, file, num) {
    let str = '';

    //存入当前传入的目录名
    let parentFile = file;
    num++;

    let dirFiles = [];

    //计算当前空格数量
    for (let i = 0; i < num * 3; i++) {
        str += ' ';
    }

    //判断file是文件还是目录
    let stats = fs.statSync(file, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });


    if (stats.isDirectory()) {

        fs.writeFileSync(fd, `${str}+---${file.split('/').slice(-1).toString()}\n`, {flag: 'a'}, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
        let files = fs.readdirSync(file, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });

        for (let file of files) {
            await preCalc(fd, `${parentFile}\/${file}`, num);
        }

    } else if (stats.isFile()) {
        fs.writeFileSync(fd, `${str}|---${file.split('/').slice(-1).toString()}\n`, {flag: 'a'}, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
    }

}


fs.readdir(process.cwd(), function (err, files) {
    if (err) {
        console.log(err);
        return;
    }

    fs.open('output.txt', 'w', function (err, fd) {
        if (err) {
            console.log(err);
            return;
        }

        //追加模式写入文件名
        fs.writeFileSync(fd, `   ${process.cwd()}\n   |\n`, {flag: 'a'}, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });

        for (let file in files) {
            preCalc(fd, files[file], 0);
        }
    })

});