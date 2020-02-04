function sayHello(name) {
  console.log('hello ${name}!')
}
function sayBye(name) {
  console.log('bye ${name}!')
}

module.exports.sayBye = sayHello
module.exports.sayBye = sayBye