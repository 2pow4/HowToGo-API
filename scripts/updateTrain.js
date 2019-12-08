// UPDATE DATABASE - Location Collection: Train
// 0-1. DB로부터 도시코드를 불러온다
// 0-2. 해당 도시코드를 각각 이용하여 (약 100개) 정류소들을 불러온다

  // 1. 한 도시코드에 대하여
  //    해당 도시코드를 통하여 정류소 조회
  // 1-1. 각각을 프라미스로 한번 더 감싸서,
  //      요청 보낸 후 결과값에 cityCode를 넣어주도록 하자
  // 2. Promise.all로 한번에 불러오기
  // 3. 각 도시 별 > 도시 별 정류소
  //    drop previous collection if exists
  // 4. insert new data (InsertMany)
  