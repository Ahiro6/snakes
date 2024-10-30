import React from 'react'
import { View } from 'react-native'

const Head = ({position, size}) => {
  return (
    <View style={{
        width: size,
        height: size,
        left: position[0] * size,
        top: position[1] * size,
        position: 'absolute',
        backgroundColor: "red"
    }}
    >

    </View>
  )
}

export default Head