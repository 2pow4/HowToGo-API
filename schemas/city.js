const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const citySchema = new Schema({
  cityCode: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  gps_long: {
    type: String,
  },
  gps_lat: {
    type: String,
  }
})

module.exports = mongoose.model('City', citySchema)

// 정류소마다 gps 정보 추가하는건 지금 시간상 어려우므로
// 도시마다 gps로 마족하고,
// 지도에 대략적인 표시만 하는 용도로 활용하도록 하자
