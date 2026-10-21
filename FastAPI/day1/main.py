from fastapi import FastAPI, Path, Query

app = FastAPI()

# '@' -> 데코레이터(Decorator)라고 부르는데, 함수를 꾸며주는 기능을 함(이것도 함수임)
# app 안에 내장함수인 get(경로지정)을 가져온 것, http method의 GET 임
# Method(행위) + URL(대상) -> GET example.com/users

# app 서버로 hello 경로로 요청하면 {"ping": "pong"} 을 반환해라

# 데코레이터가 붙은 함수
# @app.get("/hello")
# # 매개변수 없는 함수로, 반환은 딕셔너리 형태의 {"ping": "pong"}
# def root_handler():
#     return {"ping": "pong"}

# 이벤트 리스너처럼 조건이 맞으면, 함수를 실행해달라고 요청하는 것

ITEMS = [
    {"id": 1, "name": "apple", "price": 100},
    {"id": 2, "name": "banana", "price": 200},
    {"id": 3, "name": "cherry", "price": 300},
]

# 이커머스를 만들기 위해 API 작성
# 전체 상품 조회 API
@app.get(
        "/items",
        summary="전체 상품 조회 API"
        )
def get_items_handler():
    return ITEMS

# Route(길)
# Routing: 길찾기, 경로연결
# 상품 검색 API
@app.get(
        "/items/search",
        summary="상품 검색 API"
        )
# query parameter 설정 (q: str)
# 마찬가지로 Path처럼 Query Parameter도 상세조건을 줄 수 있음
def search_items_handler(
    q: str = Query(..., min_length=2),
    sort: str = Query(...)
    ):
    searched = []
    for item in ITEMS:
        if q in item["name"]:
                searched.append(item)
    return searched 

# 단일 상품 조회 API (상세보기)
# Path Parameter -> Path가 들어가있는 코드는 뒤에 있는게 좋음!!
@app.get(
        "/items/{item_id}",
        summary="단일 상품 조회 API (상세보기)"
        )

# 여기서 처음엔 FastAPI가 item_id를 문자열로 인식함
# 그래서 int 로 변경해줘야 함(item_id: int)
# item_id 범위가 정해져 있어야 함(Path)
# PatH(...) -> 이 의미는 (...) 기본값은 없지만 뒤에 조건을 갖춰야한다(1<= item_id <=3)
def get_item_detail_handler(
    item_id: int = Path(..., ge=1, le=3)
):

    # 숫자 범위: ge(이상), le(이하), gt(초과), lt(미만)
    # 최대 길이: max_length
    return ITEMS[item_id - 1]

# Path parameter랑 Query parameter 같이 쓸 수 있음
# def get_item_detail_handler(
#     item_id: int = Path(..., ge=1, le=3),
#     images: int =Query(...),
# ):