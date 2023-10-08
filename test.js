const acorn = require('acorn')
const jsx = require('acorn-jsx')
const extend = require('xtend')
const astring = require('./')
const fs = require('fs')

const tap = require('tap')

// Load text and build AST

const parser = acorn.Parser.extend(jsx())

tap.test('support empty fragments', function (t) {
  t.plan(1)
  const output = astring.generate(parser.parse('<></>'))
  t.matchSnapshot(output)
})

tap.test('support text fragments', function (t) {
  t.plan(1)
  const output = astring.generate(parser.parse('<>hello</>'))
  t.matchSnapshot(output)
})

tap.test('support jsx attibutes', function (t) {
  t.plan(2)
  const output = astring.generate(parser.parse('<Counter a={1}/>'))
  t.matchSnapshot(output)

  const output2 = astring.generate(parser.parse('<Counter a/>'))
  t.matchSnapshot(output2)
})

tap.test('basic JSX', function (t) {
  t.plan(1)
  const text = fs.readFileSync('sample.jsx').toString()
  const ast = parser.parse(text)
  var processed = astring.generate(ast, { indent: '  ' })
  t.matchSnapshot(processed)
})

tap.test('supports custom generator', function (t) {
  t.plan(1)
  var generator = extend({}, astring.GENERATOR, {
    ClassDeclaration: function ClassDeclaration(node, state) {
      t.equal(node.id.name, 'Test', 'should support custom generators')
      astring.GENERATOR.ClassDeclaration(node, state)
    },
  })

  var processed = astring.generate(parser.parse(`class Test {}`), {
    generator: generator,
    indent: '  ',
  })
})
