import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import publicIP from "react-native-public-ip";
import { SHA1 } from "crypto-js";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import axios from "axios";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [data, setData] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    publicIP()
      .then((ip) => setUserID(SHA1(ip).toString()))
      .then(() =>
        axios
          .post("http://localhost:3000/", { userID })
          .then((res) => console.log(res.status))
          .catch((err) => console.error(err))
      );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>id: {userID}</Text>
      <Text>data: {data}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
