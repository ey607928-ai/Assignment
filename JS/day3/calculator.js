// 계산이 완료된 직후인지를 판별하는 상태 변수
let isCalculated = false;

// 1. 디스플레이 요소 선택
const display = document.getElementById("display");

// 2. 숫자를 디스플레이에 추가하는 함수 (onclick과 연결)
function appendNumber(number) {
    // 만약 방금 계산을 마친 상태라면 ,새 숫자를 누를 때 디스플레이를 싹 지우고 새로 시작
    if (isCalculated) {
        display.value = "";
        isCalculated = false;
    }

    // 만약 현재 디스플레이가 '0'이라면 입력한 숫자로 덮어쓰고, 아니면 뒤에; 이어붙임
    if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}

// 3. 연산자(+, -, *, /)를 추가하는 함수
function appendOperator(operator) {
    // 연사자를 누를 때는 계산 완료 상태를 해제
    isCalculated = false;
    // 연산자 중복 입력 방지
    display.value += operator;
}

// 4. 초기화(C) 버튼 함수
function clearDisplay () {
    display.value = "0";
}

// 5. 계산(Enter) 버튼 함수
function performCalculate() {
    try {
        // eval()을 사용하면 문자열 수식을 계산해줌 ("7+3" -> 10)
        display.value = eval(display.value);

        //  계산이 완료되었음을 체크
        isCalculated = true;
    } catch (error) {
        display.value = "Error";
        isCalculated = true;
    }
    
}
