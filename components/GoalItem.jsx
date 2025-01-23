import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  function onDelete() {
    props.onDeleteItem(props.id);
  }

  return (
    <View style={styles.goalItem}>
      <Pressable
        // android_ripple={{ color: "#dddddd" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => [pressed && styles.pressedStyle]}
      >
        <Text style={styles.goalItemText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalItemText: {
    color: "white",
    padding: 8,
  },
  pressedStyle: {
    backgroundColor: "#3100b0",
  },
});

export default GoalItem;
