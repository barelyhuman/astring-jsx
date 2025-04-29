import * as astring from "astring";
import extend from "xtend";

const generator = Object.assign(
    {
        // <div></div>
        JSXElement: function JSXElement(node, state) {
            state.write("<");
            this[node.openingElement.type](node.openingElement, state);
            if (node.closingElement) {
                state.write(">");
                for (var i = 0; i < node.children.length; i++) {
                    var child = node.children[i];
                    this[child.type](child, state);
                }
                state.write("</");
                this[node.closingElement.type](node.closingElement, state);
                state.write(">");
            } else {
                state.write(" />");
            }
        },
        // <div>
        JSXOpeningElement: function JSXOpeningElement(node, state) {
            this[node.name.type](node.name, state);
            for (var i = 0; i < node.attributes.length; i++) {
                var attr = node.attributes[i];
                this[attr.type](attr, state);
            }
        },
        // </div>
        JSXClosingElement: function JSXOpeningElement(node, state) {
            this[node.name.type](node.name, state);
        },
        // div
        JSXIdentifier: function JSXOpeningElement(node, state) {
            state.write(node.name);
        },
        // Member.Expression
        JSXMemberExpression: function JSXMemberExpression(node, state) {
            this[node.object.type](node.object, state);
            state.write(".");
            this[node.property.type](node.property, state);
        },
        // attr="something"
        JSXAttribute: function JSXAttribute(node, state) {
            state.write(" ");
            this[node.name.type](node.name, state);
            if (node.value) {
                state.write("=");
                this[node.value.type](node.value, state);
            }
        },
        // namespaced:attr="something"
        JSXNamespacedName: function JSXNamespacedName(node, state) {
            this[node.namespace.type](node.namespace, state);
            state.write(":");
            this[node.name.type](node.name, state);
        },
        // {expression}
        JSXExpressionContainer: function JSXExpressionContainer(node, state) {
            state.write("{");
            this[node.expression.type](node.expression, state);
            state.write("}");
        },
        JSXFragment: function JSXFragment(node, state) {
            state.write("<>");
            for (const child of node.children) {
                this[child.type](child, state);
            }
            state.write("</>");
        },
        // { }
        JSXEmptyExpression: function JSXEmptyExpression() {
            // do nothingac
            // a single or multiline comment in the expression will be ignores
        },
        JSXText: function JSXText(node, state) {
            state.write(node.value);
        },
        // {...prop}
        // {...prop.v}
        // {...func()}
        JSXSpreadAttribute: function JSXSpreadAttribute(node, state) {
            state.write(` {...`);
            this[node.argument.type](node.argument, state);
            state.write(`} `);
        },
    },
    astring.GENERATOR,
);

export default {
    GENERATOR: generator,
    generate: (ast: astring.Node, options?: astring.Options<null>) =>
        astring.generate(
            ast,
            extend(
                {
                    generator: generator,
                },
                options ?? {},
            ),
        ),
};
