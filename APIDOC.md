# API 사용 안내

## API Specification

### Index
- [`/locations`](#get/locations)
- [`/routes`](#get/routes)
- [`/routes/gps`](#get/routes/gps)
- [Appendix #1: 공공데이터 API 사용시 엔드포인트](#appendix1)
- [Appendix #2: 사용한 공공데이터 API 서비스](#appendix2)
- [참고한 문서](#reference)

<a name="get/locations"></a>
### 도시, 정류소명의 목록 조회

URI|메서드|설명
-|-|-
`/locations`|`GET`|출발지 및 도착지 검색시 사용할 데이터셋을 반환한다. Auto Suggestion 기능에서 사용된다.

- Request Query String Parameter :
  - 쿼리 인자가 필요하지 않습니다.

- Request Example:
  ```
  /routes?departure_place=
  ```

- Response Form:
  ```js
  [
    {
      // 도시 데이터
      "cityId": "도시 ID", // string
      "cityName": "도시명" // string
    },
    {
      // 정류소 데이터
      "cityId": "도시 ID", // string
      "cityName": "도시명", // string
      "locationName": "정류소명" // string
    },
    ...
  ]
  ```

<a name="get/routes"></a>
### 조건에 만족하는 교통 노선 목록 반환하기

URI|메서드|설명
-|-|-
`/routes`|`GET`|출발지에서 도착지로 가는 모든 종류의 여행 노선 중 출발 시간 조건이 부합하는 노선 목록을 반환한다.

- Request Query String Parameter :
  - `departure_city_id = <출발 도시명>`
  - `arrival_city_id = <도착 도시명>`
  - `departure_time = <출발 시간>`

- Response Form:
  ```js
  {
    bus: [
      {
        "date": "출발일자(YYYY-MM-DD)", // string
        "type": "교통수단의 종류", // string
        "cost": "해당 노선 가격", // number
        "time_spent": "소요 시간", // number
        "departure_time": "출발 시간(HH:MM)", // string
        "departure_city": "출발 도시명", // string
        "departure_location": "출발 정류소명", // string
        "departure_location_id": "출발 정류소 ID", //string
        "arrival_time": "도착 시간(HH:MM)", // string
        "arrival_city": "도착 도시명", // string
        "arrival_location": "도착 정류소", // string
        "arrival_location_id": "도착 정류소 ID", // string
      },
      ...
    ],
    train: [
      {
        ...
      },
      ...
    ],
    airplane: [
      {
        ...
      },
      ...
    ]
  }
  ```

<a name="get/routes/gps"></a>
### 출발지와 도착지의 GPS 데이터 불러오기

URI|메서드|설명
-|-|-
`/routes/gps`|`GET`|인자로 전달되는 두 정류소의 GPS 데이터를 반환한다.

- Request Query String Parameter :
  - `departure_location_id = <출발 지점 ID>`
  - `arrival_location_id = <도착 지점 ID>`

- Response Form:
  ```json
  {
    "departure": {
      "lat": "출발 정류소의 위도 (Latitude)",
      "long": "출발 정류소의 경도 (Longitude)"
    },
    "arrival": {
      "lat": "도착 정류소의 위도 (Latitude)",
      "long": "도착 정류소의 경도 (Longitude)"
    }
  }
  ```

<a name="appendix1"></a>
## Appendix #1: 공공데이터 API 사용시 엔드포인트
```
http://openapi.tago.go.kr/openapi/service/<서비스_영문명>/<오퍼레이션_영문명>?ServiceKey=<API_키>
```

### 요청 예시
```
http://openapi.tago.go.kr/openapi/service/ExpBusInfoService/getCtyCodeList?ServiceKey=1234567890
→ 고속버스정보 서비스를 이용하여 도시 코드 목록을 요청
```

<a name="appendix2"></a>
## 사용한 공공데이터 API 서비스

번호|서비스명|영문명
-|-|-
1|열차정보 서비스|TrainInfoService
2|국내항공운항정보 서비스|DmstcFlightNvgInfoService
3|시외버스정보 서비스|SuburbsBusInfoService
4|고속버스정보 서비스|ExpBusInfoService

❗️모든 결과값은 XML 형식입니다.

### 고속버스정보 서비스

번호|서비스명|영문명
-|-|-
1|출/도착지기반 고속버스정보 조회|getStrtpntAlocFndExpbusInfo

- Request Query String Parameter :

  번호|항목명|설명
  -|-|-
  1|numOfRows|한 페이지 결과 수
  2|pageNo|페이지 번호
  3|depTerminalId|출발터미널ID
  4|arrTerminalId|도착터미널ID
  5|depPlandTime|출발일
  6|busGradeId|버스등급

- Response Form:

  번호|항목명|설명
  -|-|-
  1|routeId|노선ID
  2|gradeNm|버스등급
  3|depPlandTime|출발시간
  4|arrPlandTime|도착시간
  5|depPlaceNm|출발지
  6|arrPlaceNm|도착지
  7|charge|운임

### 시외버스정보 서비스

번호|서비스명|영문명
-|-|-
1|출/도착지기반 시외버스정보 조회|getStrtpntAlocFndSuberbsBusInfo

- Request Query String Parameter :

  번호|항목명|설명
  -|-|-
  1|numOfRows|한 페이지 결과 수
  2|pageNo|페이지 번호
  3|depTerminalId|출발터미널ID
  4|arrTerminalId|도착터미널ID
  5|depPlandTime|출발일
  6|busGradeId|버스등급

- Response Form:

  번호|항목명|설명
  -|-|-
  1|routeId|노선ID
  2|gradeNm|버스등급
  3|depPlandTime|출발시간
  4|arrPlandTime|도착시간
  5|depPlaceNm|출발지
  6|arrPlaceNm|도착지
  7|charge|운임

### 열차정보 서비스

번호|서비스명|영문명
-|-|-
1|출/도착지기반 열차정보 조회|getStrtpntAlocFndTrainInfo

- Request Query String Parameter :

  번호|항목명|설명
  -|-|-
  1|numOfRows|한 페이지 결과 수
  2|pageNo|페이지 번호
  3|depPlaceId|출발기차역ID
  4|arrPlaceId|도착기차역ID
  5|depPlandTime|출발일
  6|trainGradeId|차량종류(KTX,무궁화)

- Response Form:

  번호|항목명|설명
  -|-|-
  1|traingradename|차량종류명
  2|depplandtime|출발시간
  3|arrplandtime|도착시간
  4|depplacename|출발지
  5|arrplacename|도착지
  6|adultcharge|운임(성인)


### 국내항공운항정보 서비스

번호|서비스명|영문명
-|-|-
1|항공운행정보목록 조회|getFlightOpratInfoList

- Request Query String Parameter :
  번호|항목명|설명
  -|-|-
  1|numOfRows|한 페이지 결과 수
  2|pageNo|페이지 번호
  3|depAirportId|출발공항ID
  4|arrAirportId|도착공항ID
  5|depPlandTime|출발일
  6|airlineId|항공사ID

- Response Form:

  번호|항목명|설명
  -|-|-
  1|vihicleId|항공편명
  2|airlineNm|항공사명
  3|depPlandTime|출발시간
  4|arrPlandTime|도착시간
  5|economyCharge|일반석운임
  6|prestigeCharge|비즈니스석운임
  7|depAirportNm|출발공항
  8|arrAirportNm|도착공항

<a name="reference"></a>
## 참고한 문서

- [국토교통부 OpenAPI 활용가이드](https://www.data.go.kr/commonUser/fileDownload.do?atchFileId=FILE_000000001498053&fileDetailSn=0) - 고속버스, 시외버스, 열차
- [한국항공공사 항공기운항정보 OpenAPI 활용가이드](https://www.data.go.kr/commonUser/fileDownload.do?atchFileId=FILE_000000001523965&fileDetailSn=0) - 국제선
