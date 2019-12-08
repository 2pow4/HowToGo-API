const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const locationSchema = new Schema({
  cityCode: {
    type: String,
    required: true,
  },
  locationCode: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Location', locationSchema)

// Location 데이터 넣을 때마다, 각 데이터가 기진 '도시 이름'에 따라 City.findOne({ cityName: <도시 이름>})._id 식으로 _id를 우선 확보
// 다음, 실제 입력할 때 해당 _id를 city 필드에 사용
