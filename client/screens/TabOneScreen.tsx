import { useState, useEffect } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
} from "react-native";
import { Input, Button } from "@rneui/base";
import publicIP from "react-native-public-ip";
import { SHA1 } from "crypto-js";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import axios from "axios";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    publicIP()
      .then((ip) => setUserID(SHA1(ip).toString()))
      .then(() => {
        axios
          .post("http://localhost:3000/", { userID: userID })
          .then((res) => console.log(res.status))
          .catch((err) => console.error(err));
      });
  }, []);

  const onSubmit = (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    axios
      .post("http://localhost:3000/stamp", {
        userID,
        projectHash: value.nativeEvent.text,
      })
      .then((res) => console.log(res.status))
      .catch((err) => console.error(err));
  };

  const onPress = () => {
    axios
      .post("http://localhost:3000/judge", { userID })
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>id: {userID}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Input
        onSubmitEditing={(value) => onSubmit(value)}
        placeholder="値を入力してください"
        autoCapitalize="none"
      />
      <Button onPress={() => onPress()} style={{ width: 100 }}>
        確認
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
