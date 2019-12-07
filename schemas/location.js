const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const locationSchema = new Schema({
  city: {
    // 해당 정류소가 속한 지역 도큐먼트의 ID
    // 이후 활용시 Location.find().populate('city') 식으로 사용 필요
    // 초기 데이터 입력시, city에 ObjectId 입력해야 함
    type: ObjectId,
    required: true,
  },
  locationId: {
    type: ObjectId,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.Model('Location', locationSchema)

// Location 데이터 넣을 때마다, 각 데이터가 기진 '도시 이름'에 따라 City.findOne({ cityName: <도시 이름>})._id 식으로 _id를 우선 확보
// 다음, 실제 입력할 때 해당 _id를 city 필드에 사용
