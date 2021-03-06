//1. 매개변수 기본값 (Default Parameter vale)
    //함수를 호출할 때 매개변의 개수만큼 인수를 전달하는 것이 일반적이지만 그렇지 않은 경우에도 에러가 발생하지는 않는다. 함수는 매개변수의 개수와 인수의 개수를 체크하지 않는다. 인수가 부족한 경우, 매개변수의 값은 undefined
    function sum(x, y) {
        return x + y;
      }
      
    console.log(sum(1)); // NaN

//2. Rest 파라미터
//2.1 기본 문법
    //Rest 파라미터(Rest Parameter, 나머지 매개변수)는 매개변수 이름 앞에 세개의 점 ...을 붙여서 정의한 매개변수를 의미한다. Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.
    function foo(...rest) {
        console.log(Array.isArray(rest)); // true
        console.log(rest); // [ 1, 2, 3, 4, 5 ]
      }
      
    foo(1, 2, 3, 4, 5);
    //함수에 전달된 인수들은 순차적으로 파라미터와 Rest 파라미터에 할당된다.
    function foo(param, ...rest) {
        console.log(param); // 1
        console.log(rest);  // [ 2, 3, 4, 5 ]
      }
      
      foo(1, 2, 3, 4, 5);
      
      function bar(param1, param2, ...rest) {
        console.log(param1); // 1
        console.log(param2); // 2
        console.log(rest);   // [ 3, 4, 5 ]
      }
      
    bar(1, 2, 3, 4, 5);
    //Rest 파라미터는 이름 그대로 먼저 선언된 파라미터에 할당된 인수를 제외한 나머지 인수들이 모두 배열에 담겨 할당된다. 따라서 Rest 파라미터는 반드시 마지막 파라미터이어야 한다.
    function foo( ...rest, param1, param2) { }

    foo(1, 2, 3, 4, 5);
    // SyntaxError: Rest parameter must be last formal parameter

    //Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.
    function foo(...rest) {}
    console.log(foo.length); // 0

    function bar(x, ...rest) {}
    console.log(bar.length); // 1

    function baz(x, y, ...rest) {}
    console.log(baz.length); // 2

    //ES6에서는 rest 파라미터를 사용하여 가변 인자의 목록을 배열로 전달받을 수 있다. 이를 통해 유사 배열인 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다.
    // ES6
    function sum(...args) {
    console.log(arguments); // Arguments(5) [1, 2, 3, 4, 5, callee: (...), Symbol(Symbol.iterator): ƒ]
    console.log(Array.isArray(args)); // true
    return args.reduce((pre, cur) => pre + cur);
    }
    console.log(sum(1, 2, 3, 4, 5)); // 15

    //하지만 ES6의 화살표 함수에는 함수 객체의 arguments 프로퍼티가 없다. 따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 rest 파라미터를 사용해야 한다.
    var normalFunc = function () {};
    console.log(normalFunc.hasOwnProperty('arguments')); // true

    const arrowFunc = () => {};
    console.log(arrowFunc.hasOwnProperty('arguments')); // false

//3. Spread 문법
    //Spread 문법(Spread Syntax, ...)는 대상을 개별 요소로 분리한다. Spread 문법의 대상은 이터러블이어야 한다.
    // ...[1, 2, 3]는 [1, 2, 3]을 개별 요소로 분리한다(→ 1, 2, 3)
    console.log(...[1, 2, 3]) // 1, 2, 3

    // 문자열은 이터러블이다.
    console.log(...'Hello');  // H e l l o

    // Map과 Set은 이터러블이다.
    console.log(...new Map([['a', '1'], ['b', '2']]));  // [ 'a', '1' ] [ 'b', '2' ]
    console.log(...new Set([1, 2, 3]));  // 1 2 3

    // 이터러블이 아닌 일반 객체는 Spread 문법의 대상이 될 수 없다.
    console.log(...{ a: 1, b: 2 });
    // TypeError: Found non-callable @@iterator

//3.1 함수의 인수로 사용하는 경우   
    //배열을 분해하여 배열의 각 요소를 파라미터에 전달하고 싶은 경우, Function.prototype.apply를 사용하는 것이 일반적이다.  
    // ES5
    function foo(x, y, z) {
    console.log(x); // 1
    console.log(y); // 2
    console.log(z); // 3
    }

    // 배열을 분해하여 배열의 각 요소를 파라미터에 전달하려고 한다.
    const arr = [1, 2, 3];

    // apply 함수의 2번째 인수(배열)는 분해되어 함수 foo의 파라이터에 전달된다.
    foo.apply(null, arr);
    // foo.call(null, 1, 2, 3); 

    //ES6의 Spread 문법(…)을 사용한 배열을 인수로 함수에 전달하면 배열의 요소를 분해하여 순차적으로 파라미터에 할당한다.
    // ES6
    function foo(x, y, z) {
    console.log(x); // 1
    console.log(y); // 2
    console.log(z); // 3
    }

    // 배열을 foo 함수의 인자로 전달하려고 한다.
    const arr = [1, 2, 3];

    /* ...[1, 2, 3]는 [1, 2, 3]을 개별 요소로 분리한다(→ 1, 2, 3)
    spread 문법에 의해 분리된 배열의 요소는 개별적인 인자로서 각각의 매개변수에 전달된다. */
    foo(...arr);

//3.2 배열에서 사용하는 경우  
    //Spread 문법을 배열에서 사용하면 보다 간결하고 가독성 좋게 표현할 수 있음. 
    // ES6
    const arr = [1, 2, 3];
    // ...arr은 [1, 2, 3]을 개별 요소로 분리한다
    console.log([...arr, 4, 5, 6]); // [ 1, 2, 3, 4, 5, 6 ] 

    // ES6
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    // ...arr2는 [4, 5, 6]을 개별 요소로 분리한다
    arr1.push(...arr2); // == arr1.push(4, 5, 6);

    console.log(arr1); // [ 1, 2, 3, 4, 5, 6 ]

    // ES6
    const arr1 = [1, 2, 3, 6];
    const arr2 = [4, 5];

    // ...arr2는 [4, 5]을 개별 요소로 분리한다
    arr1.splice(3, 0, ...arr2); // == arr1.splice(3, 0, 4, 5);

    console.log(arr1); // [ 1, 2, 3, 4, 5, 6 ]

    //이때 원본 배열의 각 요소를 얕은 복사(shallow copy)하여 새로운 복사본을 생성한다. 이는 Array#slice 메소드도 마찬가지다.
    const todos = [
        { id: 1, content: 'HTML', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 3, content: 'Javascript', completed: false }
    ];

    // shallow copy
    // const _todos = todos.slice();
    const _todos = [...todos];
    console.log(_todos === todos); // false

    // 배열의 요소는 같다. 즉, 얕은 복사되었다.
    console.log(_todos[0] === todos[0]); // true