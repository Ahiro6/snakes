/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatListComponent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { GameEngine } from 'react-native-game-engine';
import { useRef } from 'react';
import Constants from './Constants'
import Head from './components/Head';
import Food from './components/Food';
import Tail from './components/Tail';
import { randomPositions } from './utility/utilities';
import GameLoop from './systems/GameLoop';
import Controls from './components/Controls';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);

  const [isGameRunning, setIsGameRunning] = useState(true)
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0)

  useEffect(() => {
    try {
      getScore(setHighscore)

      if(isNaN(highscore)) {
        setHighscore(0)
        storeScore(0)
      }
    }
    catch(e) {
      console.log(e)
    }
    
    }, [highscore]);

  const updateHighscore = () => {
    if (score > highscore) {
      setHighscore(score)
      storeScore(score)
    }
  }

  const resetGame = () => {
    setScore(0)
    engine.current.swap({
      head: headEntity,
      food: foodEntity,
      tail: tailEntity
    })

    setIsGameRunning(true)
  }

  const events = (e) => {
    switch (e) {
      case "game-over":
        Alert.alert("Game Over!", "Game Over!")
        setIsGameRunning(false)
        updateHighscore()
        return;
      case "eat":
        setScore(score + 1)
        return;
    }
  }

  return (
    <View style={styles.canvas}>
      <Text style={styles.text}>Highscore: {highscore}</Text>
      <Text style={styles.text}>{score}</Text>
      <GameEngine
        ref={engine}
        style={{
          width: BoardSize,
          height: BoardSize,
          flex: null,
          backgroundColor: "white",
        }}
        entities={{
          head: headEntity,
          food: foodEntity,
          tail: tailEntity
        }}
        systems={
          [GameLoop]
        }
        running={isGameRunning}

        onEvent={events}

      />
      <Controls engine={engine} isGameRunning={isGameRunning} resetGame={resetGame} />
    </View>
  );
}

const storeScore = async (score) => {
  try {
    await AsyncStorage.setItem("highscore", JSON.stringify(score));
  } catch (error) {
    console.log(error);
  }
}

const getScore = async (setScore) => {
  try {
    const res = await AsyncStorage.getItem("highscore");
    const score = parseInt(JSON.parse(res))
    setScore(score)

  } catch (error) {
    console.log(error);
  }
};

const removeScore = async () => {
  try {
    await AsyncStorage.removeItem("highscore");
  } catch (error) {
    console.log(error);
  }
};

const foodEntity = {
  position: [
    randomPositions(0, Constants.GRID_SIZE - 1),
    randomPositions(0, Constants.GRID_SIZE - 1)
  ],
  size: Constants.CELL_SIZE,
  renderer: <Food />
}

const tailEntity = {
  size: Constants.CELL_SIZE,
  elements: [],
  renderer: <Tail />
}

const headEntity = {
  position: [0, 0],
  size: Constants.CELL_SIZE,
  updateFrequency: 10,
  nextMove: 10,
  xspeed: 0,
  yspeed: 0,
  renderer: <Head />
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    marginTop: 15,
    fontSize: 22,
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 10
}
});

export default App;
