const upyun = require('upyun');
let service;
let client;
const fs = require('fs');
const packageStatic = require('./package.json');
const readline = require('readline');

const localFolder = `./dist/${packageStatic.version}`;
const upyunFolder = `/${packageStatic.name}/${process.env.env_config}/${packageStatic.version}`;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function copyDir (src, dist) {
    fs.readdir(src, function (err, paths) {
        if (err) {
            console.log(err.message);
        } else {
            paths.forEach(function (path) {
                var _src = src + '/' + path;
                var _dist = dist + '/' + path;

                console.log('原地址：' + _src);
                console.log('远程地址：' + _dist);

                fs.stat(_src, function (err, stat) {
                    if (err) {
                        // console.log(err.message);
                    } else {
                        if (stat.isFile()) {
                            fs.readFile(_src, function (err, data) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    client.putFile(_dist, data, options = {});
                                }
                            });
                        }
                        if (stat.isDirectory()) {
                            copyDir(_src, _dist);
                        }
                    }
                });
            });   	
        }
    });
}

rl.question('请输入又拍云账号：', function (account) {
    rl.question('请输入又拍云密码：', function (password) {
        service = new upyun.Service('yyyq2017', account, password);
        client = new upyun.Client(service);
        rl.close();
    });
});

rl.on('close', function () {
    client.makeDir(upyunFolder).then(function () {
        console.log('make dir success!');
        copyDir(localFolder, upyunFolder);
    });
});

