$path_from = "C:\Work\JS\pos-prototype-2\"
$path_to = "C:\Work\JS\vue-budget\"
$dir_name = "dist"
$packageJsonFileName = "package.json"
$packageJsonContent = '{
  "name": "vue-budget",
  "version": "1.0.0",
  "description": "Heroku App",
  "author": "mrnenaz",
  "private": false,
  "scripts": {
    "postinstall": "npm install express"
  }
}'

$serverFileName = "server.js"
$serverFileContent = "var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
app = express()
app.use(serveStatic(__dirname))
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)"

Remove-Item -Path "$path_to$dir_name`\" -Recurse

xcopy "$path_from$dir_name`\" "$path_to$dir_name`\" /E

Set-Location "$path_to$dir_name`\"

New-Item $packageJsonFileName

Set-Content $packageJsonFileName $packageJsonContent -Force
Set-Content $serverFileName $serverFileContent -Force

git add --all

git commit -m "auto deploy"

git push origin master
