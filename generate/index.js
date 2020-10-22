const { program } = require('commander')
const template = require('art-template')
const path = require('path')
const fs = require('fs')
program
  .version('1.0.0')
  .requiredOption('-f, --file <type>', '数据文件')
  .option('-d, --debug <type>', '开启调试模式', 1)
  .option('-c, --config <type>', '配置文件', 'config.json')
  .option('-co, --covered <type>', '是否覆盖(1->覆盖,0->不覆盖)', 0)
  .parse(process.argv)

// 原始语法的界定符规则
template.defaults.rules[0].test = /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/
// 标准语法的界定符规则(默认的开始结束标签为{{和}}，与vue的模板语法有冲突，所以修改一下<{ }>)
template.defaults.rules[1].test = /<{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}>/
// 设置模板引擎调试模式
template.defaults.debug = (program.debug === 1 || program.debug === '1')
// 禁止压缩
template.defaults.minimize = false

/**
 * 主函数
 */
function main() {
  var dataFile = program.file
  if (!fs.existsSync(dataFile)) {
    dataFile = path.join(__dirname, `data/${dataFile}`)
    if (!fs.existsSync(dataFile)) {
      log(`${program.file}元数据文件不存在`)
      process.exit(1)
    }
  }
  var configFile = program.config
  if (!fs.existsSync(program.config)) {
    configFile = path.join(__dirname, configFile)
    if (!fs.existsSync(configFile)) {
      log(`${program.config}元数据文件不存在`)
      process.exit(1)
    }
  }
  var data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
  var config = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
  genCode(config, data)
}
/**
 * 生成代码
 * @param config 配置文件
 * @param {*} data 元数据
 */
function genCode(config, data) {
  config.templates.forEach(item => {
    if (item.selected) {
      var templateFile = item.templateFile
      var targetPath = template.render(item.targetPath, data)
      var targetFileName = template.render(item.targetFileName, data)
      log(`模板名称：${item.name}`)
      log(`模板文件：${templateFile}`)
      var content = template(path.join(__dirname, `templates/${templateFile}`), data)
      targetPath = path.join(path.resolve(__dirname, '..'), `${targetPath}`)
      if (!fs.existsSync(targetPath)) {
        mkdirs(targetPath)
      }
      var targetFile = path.join(targetPath, targetFileName)
      if (fs.existsSync(targetFile)) {
        if (program.covered === 1 || program.covered === '1') {
          log(`目标文件－被覆盖：${targetFile}`)
          writeFile(content, targetFile)
        } else {
          if(item.covered) {
            log(`目标文件－被覆盖：${targetFile}`)
            writeFile(content, targetFile)
          } else {
            log(`目标文件－已存在：${targetFile}`)
          }
        }
      } else {
        log(`目标文件－新生成：${targetFile}`)
        writeFile(content, targetFile)
      }
    }
  })
}
/**
 * 写文件
 * @param {*} content
 * @param {*} targetFile
 */
function writeFile(content, targetFile) {
  fs.writeFile(targetFile, content, {}, (err) => {
    if (err) {
      log(err)
    }
  })
}
/**
 * 创建多级目录
 * @param {} dirpath
 */
function mkdirs(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath))
  }
  fs.mkdirSync(dirpath)
}
/**
 * 日志打印
 * @param {} msg 打印的消息
 */
function log(msg) {
  if (program.debug === 1 || program.debug === '1') {
    console.log(msg)
  }
}
// 入口函数
main()
