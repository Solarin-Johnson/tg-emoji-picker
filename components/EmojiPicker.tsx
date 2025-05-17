import React, { useMemo, useRef } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ViewStyle,
  Platform,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { processEmojiSections } from "@/function";
import { useThemeColor } from "@/hooks/useThemeColor";
import { EmojiSection } from "@/constants/data";

const PICKER_WIDTH = 300;
const PICKER_PAD = 5;
const PICKER_GAP = 12;
const PICKER_RADIUS = 12;
const CHUNK_SIZE = 8;
const EMOJI_SIZE = PICKER_WIDTH / CHUNK_SIZE;
const EMOJI_SCALE_RATIO = 1.3;
const CATEGORY_HEADER_HEIGHT = EMOJI_SIZE + PICKER_PAD;

const TOP_CORNER_STYLE: ViewStyle = {
  borderTopLeftRadius: PICKER_RADIUS,
  borderTopRightRadius: PICKER_RADIUS,
};

const isWeb = Platform.OS === "web";

export type EmojiPickerProps = {
  data: EmojiSection[];
};

export default function EmojiPicker({ data }: EmojiPickerProps) {
  const barColor = useThemeColor({}, "barColor");
  const sectionListRef = useRef<SectionList>(null);
  const { width } = useWindowDimensions();
  const DATA = useMemo(() => processEmojiSections(data, CHUNK_SIZE), [data]);

  const scrollToSection = (sectionIndex: number) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      animated: true,
      viewOffset: EMOJI_SIZE,
    });
  };

  return (
    <View
      style={{
        backgroundColor: barColor,
        paddingHorizontal: PICKER_PAD,
        borderRadius: PICKER_RADIUS,
      }}
    >
      <View
        style={[
          styles.container,
          { width: PICKER_WIDTH, maxHeight: PICKER_WIDTH },
        ]}
      >
        <EmojiCategoryBar data={data} onPress={scrollToSection} />
        <SectionList
          ref={sectionListRef}
          sections={DATA}
          style={TOP_CORNER_STYLE}
          contentContainerStyle={{
            paddingTop: CATEGORY_HEADER_HEIGHT,
            paddingBottom: PICKER_GAP,
          }}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <EmojiRow items={item} />}
          renderSectionHeader={({ section }) => {
            const sectionIndex = data.findIndex(
              (s) => s.title === section.title
            );
            return sectionIndex > 0 ? (
              <View style={styles.header}>
                <ThemedText style={styles.headerText} type="defaultSemiBold">
                  {section.title}
                </ThemedText>
              </View>
            ) : null;
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={CHUNK_SIZE}
          maxToRenderPerBatch={CHUNK_SIZE * 2}
        />
      </View>
    </View>
  );
}

function EmojiCategoryBar({
  data,
  onPress,
}: {
  data: EmojiSection[];
  onPress: (index: number) => void;
}) {
  const barColor = useThemeColor({}, "barColor");
  const text = useThemeColor({}, "text");
  return (
    <ScrollView
      style={[styles.topbar, { backgroundColor: barColor }]}
      contentContainerStyle={{
        padding: PICKER_PAD,
        gap: 4,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data.map((section, index) => (
        <TouchableOpacity
          key={section.title}
          onPress={() => onPress(index)}
          style={{
            height: "100%",
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: text + "10",
            borderRadius: PICKER_RADIUS / 2,
          }}
        >
          <Text style={styles.icon}>{section.icon}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function EmojiRow({ items }: { items: { emoji: string; index: number }[] }) {
  return (
    <View style={styles.row}>
      {items.map((emojiObj) => (
        <View style={styles.emojiContainer} key={emojiObj.index}>
          <Text style={styles.emoji}>{emojiObj.emoji}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  emojiContainer: {
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: EMOJI_SIZE / EMOJI_SCALE_RATIO,
    textAlign: "center",
  },
  header: {
    height: EMOJI_SIZE,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.6,
  },
  topbar: {
    position: "absolute",
    top: 0,
    left: -PICKER_PAD,
    width: PICKER_WIDTH + 2 * PICKER_PAD,
    zIndex: 1,
    height: CATEGORY_HEADER_HEIGHT,
    ...TOP_CORNER_STYLE,
  },
  icon: {
    fontSize: EMOJI_SIZE / (PICKER_PAD / 2.5),
  },
  row: {
    flexDirection: "row",
  },
});
