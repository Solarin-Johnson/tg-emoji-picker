import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import EmojiPicker from "@/components/EmojiPicker";
import { EMOJI } from "@/constants/data";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <EmojiPicker data={EMOJI} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
