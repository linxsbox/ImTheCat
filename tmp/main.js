import estm from '../tmp/testModule.ES'
estm.whatsThis() // 猜猜this输出是啥？

const tm = require('../tmp/testModule.Common')
tm.whatsThis() // 猜猜this输出是啥？

const console = require('console')

console.log(13)