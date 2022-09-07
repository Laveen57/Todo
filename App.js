import React, { useState } from 'react';
import { FlatList, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos,setTodos]=useState('');


  const pressHandler = (key)=>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(to=>to.key!=key);
    });
  }


  const submitHandler = (text)=>{
    setTodos((prevTodos)=>{
      return [
        {text: text, key: Math.random().toString()},
        ...prevTodos
      ];
    })
  }
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
      <AddTodo submitHandler={submitHandler}/>
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({item})=>(
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
          
        </View>
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding:40,
  },
  list:{
    marginTop:20,
  }
});
