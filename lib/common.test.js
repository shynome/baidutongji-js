const common = require("./common")
var a = { "a":7 }

void async function main() {
  console.log([
    a,
    await common.GZDecode(await common.GZEncode(a)),
  ])
}()