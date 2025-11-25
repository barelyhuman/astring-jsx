const acorn = require('acorn')
const jsx = require('acorn-jsx')
const extend = require('xtend')
const astring = require('./')
const fs = require('fs')
const {snapshot} = require("@barelyhuman/node-snapshot")
const assert = require("node:assert")

const t = require('node:test')


// Load text and build AST

const parser = acorn.Parser.extend(jsx())

t.test('support empty fragments', function (t) {
  const output = astring.generate(parser.parse('<></>'))
  snapshot(t,output)
})

t.test('support text fragments', function (t) {
  const output = astring.generate(parser.parse('<>hello</>'))
  snapshot(t,output)
})

t.test('support jsx attibutes', function (t) {
  const output = astring.generate(parser.parse('<Counter a={1}/>'))
  snapshot(t,output)

  const output2 = astring.generate(parser.parse('<Counter a/>'))
  snapshot(t,output2)
})

t.test('basic JSX', function (t) {
  const text = fs.readFileSync('sample.jsx').toString()
  const ast = parser.parse(text)
  var processed = astring.generate(ast, { indent: '  ' })
  snapshot(t,processed)
})

t.test('supports custom generator', function (t) {
  var generator = extend({}, astring.GENERATOR, {
    ClassDeclaration: function ClassDeclaration(node, state) {
      assert.equal(node.id.name, 'Test', 'should support custom generators')
      astring.GENERATOR.ClassDeclaration(node, state)
    },
  })

  var processed = astring.generate(parser.parse(`class Test {}`), {
    generator: generator,
    indent: '  ',
  })
})
