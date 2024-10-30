import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity, Text } from 'react-native'

const Controls = ({ engine, isGameRunning, resetGame }) => {
    return (
        <View>
            <View style={styles.controlContainer}>
                <View style={styles.controllerRow}>
                    <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
                        <View style={styles.controlBtn} />
                    </TouchableOpacity>
                </View>
                <View style={styles.controllerRow}>
                    <TouchableOpacity
                        onPress={() => engine.current.dispatch("move-left")}
                    >
                        <View style={styles.controlBtn} />
                    </TouchableOpacity>
                    <View style={[styles.controlBtn, { backgroundColor: null }]} />
                    <TouchableOpacity
                        onPress={() => engine.current.dispatch("move-right")}
                    >
                        <View style={styles.controlBtn} />
                    </TouchableOpacity>
                </View>
                <View style={styles.controllerRow}>
                    <TouchableOpacity
                        onPress={() => engine.current.dispatch("move-down")}
                    >
                        <View style={styles.controlBtn} />
                    </TouchableOpacity>
                </View>
            </View>
            {!isGameRunning && (
                <TouchableOpacity onPress={resetGame}>
                    <Text
                        style={{
                            color: "white",
                            marginTop: 15,
                            fontSize: 22,
                            padding: 10,
                            backgroundColor: "grey",
                            borderRadius: 10
                        }}
                    >
                        Start New Game
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    controlContainer: {
      marginTop: 10,
    },
    controllerRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    controlBtn: {
      backgroundColor: "yellow",
      width: 100,
      height: 100,
    },
  });

export default Controls