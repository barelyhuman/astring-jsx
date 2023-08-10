/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.js TAP supports all JSX features > must match snapshot 1`] = `
class Test {
  render() {
    const obj = {
      a: 1
    };
    const funcObj = () => {
      return {
        a: 1
      };
    };
    return <>
        <div foo="bar" foo:bar={bux}>
          This is a test.
          <Test.Name.Foo />
          {foo.map(() => "bar")}
          <p>Text</p>
          <div {...obj}  {...obj.a}  {...funcObj()}  />
        </div>
      </>;
  }
}

`
