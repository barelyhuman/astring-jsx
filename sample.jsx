// prettier-ignore

class Test {
  render() {
    const obj = {
      a: 1,
    };
    const funcObj=()=>{
      return {
        a:1
      }
    }
    return (
      <>
        <div foo="bar" foo:bar={bux}>
          This is a test.
          <Test.Name.Foo />
          {foo.map(() => "bar")}
          <p>Text</p>
          <div {...obj} {...obj.a} {...funcObj()}/>
          {/* keep raw values */}
          <div>
            <span>1&lt;2</span>
            <span>1&copy;2</span>
            <span>1&gt;2</span>
            <span>1 & 2</span>
          </div>
        </div>
      </>
    );
  }
}
