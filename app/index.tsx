import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
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
    paddingVertical: 84,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
