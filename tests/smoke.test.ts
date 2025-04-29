import { Parser } from "acorn";
import jsx from "acorn-jsx";
import fs from "fs";
import { test } from "vitest";
import extend from "xtend";
import astring from "../src/index";

// Load text and build AST
const parser = Parser.extend(jsx());

test("support empty fragments", async function (t) {
  const output = astring.generate(
    parser.parse("<></>", { ecmaVersion: 2020 }),
  );
  t.expect(output).toMatchSnapshot();
});

test("support text fragments", function (t) {
  const output = astring.generate(
    parser.parse("<>hello</>", { ecmaVersion: 2020 }),
  );
  t.expect(output).toMatchSnapshot();
});

test("support jsx attibutes", function (t) {
  const output = astring.generate(
    parser.parse("<Counter a={1}/>", { ecmaVersion: 2020 }),
  );
  t.expect(output).toMatchSnapshot();

  const output2 = astring.generate(
    parser.parse("<Counter a/>", { ecmaVersion: 2020 }),
  );
  t.expect(output2).toMatchSnapshot();
});

test("basic JSX", function (t) {
  const text = fs.readFileSync("sample.jsx").toString();
  const ast = parser.parse(text, { ecmaVersion: 2020 });
  const processed = astring.generate(ast, { indent: "  " });
  t.expect(processed).toMatchSnapshot();
});

test("supports custom generator", function (t) {
  const generator = extend({}, astring.GENERATOR, {
    ClassDeclaration: function ClassDeclaration(node, state) {
      t.expect(node.id.name).equal("Test", "should support custom generators");
      astring.GENERATOR.ClassDeclaration(node, state);
    },
  });

  const processed = astring.generate(
    parser.parse(`class Test {}`, { ecmaVersion: 2020 }),
    {
      generator: generator,
      indent: "  ",
    },
  );
});
