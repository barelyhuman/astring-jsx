/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.js TAP basic JSX > must match snapshot 1`] = `
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
          {}
          <div>
            <span>1&lt;2</span>
            <span>1&copy;2</span>
            <span>1&gt;2</span>
            <span>1 & 2</span>
          </div>
        </div>
      </>;
  }
}

`

exports[`test.js TAP support empty fragments > must match snapshot 1`] = `
<></>;

`

exports[`test.js TAP support jsx attibutes > must match snapshot 1`] = `
<Counter a={1} />;

`

exports[`test.js TAP support jsx attibutes > must match snapshot 2`] = `
<Counter a />;

`

exports[`test.js TAP support text fragments > must match snapshot 1`] = `
<>hello</>;

`
