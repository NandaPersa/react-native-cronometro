import styled from "styled-components/native";
import SafeAreaView from "react-native-safe-area-view";
import { StatusBar } from "react-native";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: aliceblue;
  padding-top: ${StatusBar.currentHeight}px;
  justify-content: center;
  align-items: center;
`;

const Timer = styled.Text`
  font-size: 60px;
  font-family: "RobotoMono_700Bold";
`;

const SectionButtons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonStart = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  background-color: #1a237e;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 30px;
`;

const ButtonAux = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  background-color: #1a237e;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 30px;
`;

export default { Container, Timer, ButtonStart, SectionButtons, ButtonAux };
