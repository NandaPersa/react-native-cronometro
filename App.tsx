import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Styled from "./style";
import { useFonts, RobotoMono_700Bold } from "@expo-google-fonts/roboto-mono";
import { ActivityIndicator } from "react-native";
import Timeformat from "hh-mm-ss";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  const [originalSeconds, setOriginalSeconds] = useState(10);
  const [time, setTime] = useState<number>(10);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sound.mp3")
    );
    await sound?.playAsync();
  }

  let originalSecondsAux = originalSeconds;

  async function start() {
    const pause = await AsyncStorage.getItem("pause");
    if (pause && pause === "true") {
      setOriginalSeconds(originalSecondsAux);
      return;
    } else {
      setIsPlaying(true);
      setTimeout(() => {
        setTime(originalSecondsAux - 1);
        originalSecondsAux = originalSecondsAux - 1;
        if (originalSecondsAux > 0) start();
        if (originalSecondsAux === 0) {
          setOriginalSeconds(10);
          setIsPlaying(false);
          playSound();
        }
      }, 1000);
    }
  }

  async function handlePressStart() {
    await AsyncStorage.setItem("pause", "false");
    start();
  }

  async function handlePressPause() {
    await AsyncStorage.setItem("pause", "true");
    setIsPlaying(false);
  }

  async function handlePressStop() {
    await handlePressPause();
    setTimeout(() => {
      setOriginalSeconds(10);
      setTime(10);
    }, 1000);
  }

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <Styled.Container>
          <ActivityIndicator color="#1a237e" size={50} />
        </Styled.Container>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <Styled.Container>
          <Styled.Timer>{Timeformat.fromS(time)}</Styled.Timer>
          <Styled.SectionButtons>
            <Styled.ButtonAux onPress={start} style={{ elevation: 10 }}>
              <MaterialCommunityIcons
                name="refresh"
                size={32}
                color="#eeeeee"
              />
            </Styled.ButtonAux>
            <Styled.ButtonStart
              onPress={() =>
                isPlaying ? handlePressPause() : handlePressStart()
              }
              style={{ elevation: 10 }}
            >
              <FontAwesome
                name={isPlaying ? "pause" : "play"}
                size={32}
                color="#eeeeee"
              />
            </Styled.ButtonStart>
            <Styled.ButtonAux
              onPress={handlePressStop}
              style={{ elevation: 10 }}
            >
              <MaterialCommunityIcons name="stop" size={32} color="#eeeeee" />
            </Styled.ButtonAux>
          </Styled.SectionButtons>
        </Styled.Container>
      </SafeAreaProvider>
    );
  }
}
