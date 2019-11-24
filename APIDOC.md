# API 사용 안내

## API Specification

### Index

- [`/routes`](#get/routes)
- [`/routes/gps`](#get/routes/gps)
- [`/cities`](#get/cities)
- [`/cities/locations`](#get/cities/locations)

<a name="get/routes"></a>
### 조건에 만족하는 교통편 목록 반환하기

URI|메서드|설명
-|-|-
`/routes`|`GET`|출발지에서 도착지로 가는 경로 중 조건에 만족하는 교통편을 모두 반환한다

- Request Query String Parameter :
  - `departure_place = <출발지>`
  - `arrival_place = <목적지>`
  - `departure_time = <출발 시간>`
  - `arrival_time = <도착 시간>`

- Request Example:
  ```
  /routes?departure_place=
  ```

- Response Form:
  ```json
  [
    {
      "vehicle_type": "교통 데이터의 교통 수단 분류",
      "cost": "해당 교통수단 운임",
      "departure_time": "출발 시간",
      "departure_city": "출발 도시",
      "departure_location": "출발 정류소",
      "arrival_time": "도착 시간",
      "arrival_city": "도착 도시",
      "arrival_location": "도착 정류소"
    },
    {
      "more": "to come..."
    },
  ]
  ```

<a name="get/routes/gps"></a>
### 출발지와 도착지의 GPS 데이터 불러오기

URI|메서드|설명
-|-|-
`/routes/gps`|`GET`|출발지에서 도착지로 가는 경로 중 조건에 만족하는 교통편을 모두 반환한다

- Request Query String Parameter :
  - `departure_location_id = <출발 지점 ID>`
  - `arrival_location_id = <도착 지점 ID>`

- Response Form:
  ```json
  {
    "departure_lat": "출발 정류소의 위도 (Latitude)",
    "departure_long": "출발 정류소의 경도 (Longitude)",
    "arrival_lat": "도착 정류소의 위도 (Latitude)",
    "arrival_long": "도착 정류소의 경도 (Longitude)",
  }
  ```

<a name="get/cities"></a>
### 전체 도시 목록 반환하기

URI|메서드|설명
-|-|-
`/cities`|`GET`|전체 도시 목록을 반환 - 검색 창의 자동 완성 기능에서 사용

- Request Argument:

  Not required

- Response Form:
  ```json
  [
    {
      "city_name": "도시 이름"
    },
    {
      "more": "to come..."
    },
  ]
  ```

<a name="get/cities/locations"></a>
### 특정 도시에 포함된 정류소 목록 반환하기

URI|메서드|설명
-|-|-
`/cities/locations`|`GET`|특정 도시에 포함된 정류소 목록 반환하기 - 검색 창의 자동 완성 기능에서 사용

- Request Argument:
  - `city_name = <도시 이름>`

- Response Form:
  ```json
  [
    {
      "location_name": "정류소 이름",
      "vehicle_type": "교통수단 종류",
    },
    {
      "more": "to come..."
    },
  ]
  ```

## 공공데이터 API 사용시 엔드포인트

```
- http://openapi.airport.co.kr/service/rest/<주_오퍼레이션_영문명>/<부_오퍼레이션_영문명>?ServiceKey=<API_키>&pageNo=<페이지_번호>
- http://openapi.tago.go.kr/openapi/service/<서비스_영문명>/<오퍼레이션_영문명>?ServiceKey=<API_키>
```

## 사용한 공공데이터 API 서비스

번호|일련번호|서비스명|영문명
-|-|-|-
1|SC-OA-26-04|열차정보 서비스|TrainInfoService
2|SC-OA-26-06|국내항공운항정보 서비스|DmstcFlightNvgInfoService
3|SC-OA-26-08|시외버스정보 서비스|SuburbsBusInfoService
4|SC-OA-26-09|고속버스정보 서비스|ExpBusInfoService

### 열차정보 서비스

우리 API에서 필요한 오퍼레이션에 대하여 기술

### 국내항공운항정보 서비스

우리 API에서 필요한 오퍼레이션에 대하여 기술

### 시외버스정보 서비스

우리 API에서 필요한 오퍼레이션에 대하여 기술

### 고속버스정보 서비스

우리 API에서 필요한 오퍼레이션에 대하여 기술

## 참고한 문서

- [국토교통부 OpenAPI 활용가이드](https://www.data.go.kr/commonUser/fileDownload.do?atchFileId=FILE_000000001498053&fileDetailSn=0) - 고속버스, 시외버스, 열차
- [한국항공공사 항공기운항정보 OpenAPI 활용가이드](https://www.data.go.kr/commonUser/fileDownload.do?atchFileId=FILE_000000001523965&fileDetailSn=0) - 국제선
