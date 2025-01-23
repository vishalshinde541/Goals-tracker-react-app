import { useState } from "react";
import { StyleSheet, View, TextInput, Button, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [enteredGols, setEnteredGoals] = useState([]);

  const generatedNumbers = new Set();
  function getUniqueRandomNumber() {
    let randomNum;
    do {
      randomNum = Math.random().toString();
    } while (generatedNumbers.has(randomNum));

    generatedNumbers.add(randomNum);
    return randomNum;
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText.trim() !== "") {
      setEnteredGoals((currentEnteredGoals) => [
        ...currentEnteredGoals,
        { text: enteredGoalText, id: getUniqueRandomNumber() },
      ]);

      endAddGoalHandler();
    }
  }

  function deleteGoalHandler(id) {
    console.log(id);
    setEnteredGoals((currentEnteredGoals) => {
      return currentEnteredGoals.filter((goal) => {
        goal.id !== id;
      });
    });
  }

  function deleteGoalHandler(id) {
    setEnteredGoals((currentEnteredGoals) => {
      return currentEnteredGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light"></StatusBar>
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        ></Button>
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsListContainer}>
          <FlatList
            data={enteredGols}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#1e085a",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  goalsListContainer: {
    flex: 3,
    paddingTop: 20,
  },
});
