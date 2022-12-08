import React, { useState, useEffect } from "react";
import { Linking, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "@rneui/base";

export const Scanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    setScanned(true);
    alert(`bar code with type ${type} and data ${Linking.openURL(data)} `);
  };

  switch (hasPermission) {
    case true:
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>
          )}
        </View>
      );
    case false:
      return <Text>No Access to Camera</Text>;
    case null:
      return <Text>Request for Camera Permission</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid black",
  },
});
