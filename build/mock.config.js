const fs = require('fs')
const path = require('path')


// const mockBaseURL = '//note-server.hunger-valley.com'
const mockBaseURL = '//note-server.hunger-valley.com'
const realBaseURL = '//note.hunger-valley.com'

exports.config = function({ isDev = true } = { isDev: true} ) {
  let fileTxt = `
  module.exports = {
    baseURL: '${isDev ? mockBaseURL : realBaseURL}'
  }
  `
  //切换要写入config-baseURL.js的api地址
  fs.writeFileSync(path.join(__dirname, '../src/support/config-baseURL.js'), fileTxt)
//  把切换好的api地址写进去
}
