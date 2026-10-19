// Rest 파라미터를 사용하면 개수에 상관없이 인자를 배열로 받을 수 있음
// => : 화살표 함수
// 덧셈

// reduce 메서드가 내부적으로 대략 이런 로직을 대신 실행해줌
// function myReduce(numbersArray) {
//     let accumulator = 0; // 초기값 0
    
//     for (let i = 0; i < numbersArray.length; i++) {
//         let current = numbersArray[i]; // 현재 숫자
//         // 우리가 쓴 식의 오른쪽 부분(동작)이 바로 이 자리에서 실행됨
//         accumulator = accumulator + current; 
//     }
//     return accumulator;
// }

function addAll (...numbers) {
    // reduce를 사용해 모든 숫자를 차레대로 더함
    // 0은 초기값, 0에다가 더해 달라는 의미
    return numbers.reduce((accumulator, current) => accumulator + current, 0);
};
// console.log(addAll(1, 2, 3));

// 뺄셈
function subtractAll (...numbers) {
    return numbers.reduce((accumulator, current) => accumulator - current);
};
// console.log(subtractAll(1, 2, 3));

// 곱셈
function multiplyAll (...numbers) {
    return numbers.reduce((accumulator, current) => accumulator * current, 1);
};
// console.log(multiplyAll(1, 2, 3));

// 나눗셈
function divideAll (...numbers) {
    return numbers.reduce((accumulator, current) => accumulator / current);
};
// console.log(divideAll(9, 3, 3));

// 입력된 수식에서 곱셈/나눗셈을 우선 처리하고 덧셈/뺄셈을 처리하는 메인 함수
// '\'(역슬래시, 백슬래시) : 특수문자의 기능을 없애고 '문자 그대로' 읽게 만드는 역할
// '\s' -> 공백을 의미함
// '/.../'(슬래시 쌍) : 정규식을 시작하고 끝내는 테두리 역할을 함
function calculateExpression(expression) {
    let expr = expression.replace(/\s+/g, '');

    // 정규식을 이용해서 숫자와 연사자 배열로 분리
    // 예: "1+2*3" -> ["1", "+", "2", "*", "3"]
    // '\d' -> 숫자를 의미함,  '/g' -> Global 약자, 모두 찾아라
    let tokens = expr.match(/(\d+|\+|\-|\*|\/)/g);
    if (!tokens) return 0;

    // [1단계] 곱셈(*)과 나눗셈(/) 먼저 처리
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            let left = Number(tokens[i -1]);
            let right = Number(tokens[i + 1]);
            let subResult;
            
            // multiplyAll 또는 divideAll 함수
            if (tokens[i] === '*') {
                subResult = multiplyAll(left, right);
            } else {
                subResult = divideAll(left, right);
            };

            // 계산된 결과를 배열에 반영하고 기존 연산자와 피연산자 제거
            // splice(시작인덱스, 삭제할개수, 새로추가할요소1, 새로추가할요소2, ...)
            // i에서 -1인 인덱스 값부터 3개 지우고, subResult 값만 집어넣으라는 뜻
            tokens.splice(i - 1, 3, subResult);
            i--; // 인덱스 조정
        }
    }
    // [2단계] 덧셈(+)과 뺄셈(-) 처리
    let finalResult = Number(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        let op = tokens[i];
        let nextNum = Number(tokens[i + 1]);

        // addAll 또는 subtractAll 함수
        if (op === '+') {
            finalResult = addAll(finalResult, nextNum);
        } else if (op === '-') {
            finalResult = subtractAll(finalResult, nextNum);
        }
    }
    return finalResult
}

// 웹 브라우저 콘솔창에서 실행하는 시작 함수
function start() {
    let input = prompt("계산식을 입력하세요 (예: 1 + 2 * 3):");
    if (input) {
        let result = calculateExpression(input);
        console.log(`입력한 식: ${input}`);
        console.log(`계산 결과: ${result}`);
        alert('결과: ${result}');
    }
}