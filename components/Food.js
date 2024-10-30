import React from 'react'
import { View } from 'react-native'

const Food = ({ position, size }) => {
  return (
    <View style={{
      width: size,
      height: size,
      left: position[0] * size,
      top: position[1] * size,
      position: 'absolute',
      backgroundColor: "green",
      borderRadius: 50
    }}
    >

    </View>
  )
}

export default Food