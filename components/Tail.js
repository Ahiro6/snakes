import React from 'react'
import { View } from 'react-native'
import Constants from '../Constants'

const Tail = ({elements, position, size}) => {
  const tailList = elements.map((el, i) => (
    <View key={i}
      style={{
        width: size,
        height: size,
        left: el[0] * size,
        top: el[1] * size,
        position: "absolute",
        backgroundColor: "orange"
      }}
    />
  ))

  return (
    <View
    style={{
      width: Constants.GRID_SIZE * size,
      height: Constants.GRID_SIZE * size,
    }}
    >
      {tailList}
    </View>
  )
}

export default Tail