const { User } = require("./user")

void async function main() {
  let res = await new User().Login()
}().catch(err=>{
  console.error(err)
  debugger
})