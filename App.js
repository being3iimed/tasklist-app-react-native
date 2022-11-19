
import React,{useState} from 'react';
import {StyleSheet, Text, View, TextInput, Touchable, Keyboard,ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import Task from './component/Task';

export default function App() {
  const [task, setTask] = useState();
  /*task : name of the state to track the task that we have
  setTask : is the function we going to use to set this state */
  const [taskItems, setTaskItems] = useState([]);
  const handleAddTask = () => {
    Keyboard.dismiss(); 
    setTaskItems([...taskItems, task])
    setTask(null);
  }
  const completeTask = (index) => {
    let itemCopy = [...taskItems];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy)
  }  
  return (
    <View style={styles.container}>
      {/*adding scroll to enable scrolling when list is longer than the page */}
      <ScrollView 
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps='handled'
          >
        {/*today's tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Tasks for today</Text>
          <View style={styles.items}>
          {/*tasks section*/}
          {
            taskItems.map((item, index) => {
             return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
               <Task text={item}/>
              </TouchableOpacity>
             )
          })
        }        
        </View>
      </View>
      </ScrollView>
        {/* write a task*/}
        <View
            /* if u want keyboard does not cover the items on screen
               use keyboardAvoidingView instead of View & uncomment the next line*/
            /*behavior={Platform.OS=== "ios" ? "padding" : "height"}*/
          style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder={'Write down here your task'} value={task} onChangeText={text => setTask(text)}  />  
          <TouchableOpacity onPress ={() =>handleAddTask()} >
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',

  },
    tasksWrapper:{
      paddingTop : 80,
      paddingHorizontal : 20,



  },
    sectionTitle: {
      fontSize : 24,
      fontWeight :'bold'
  },
    items:{
      marginTop :30,
  },
    writeTaskWrapper:{
      position: 'absolute',   
      bottom: 60,
      marginLeft:15,
      marginRight:15,
      width: '100%',
      flexDirection:'row',
      justifyContent:'space-ar',
      alignItems: 'center',
    },
    input:{
      paddingVertical:15,
      width:250,
      paddingHorizontal:15,
      backgroundColor:'#fff',
      borderRadius:60,
      borderColor:"#C0C0C0",
      borderWidth:1,

    },
    addWrapper:{
      width:60,
      height:60,
      marginRight : 20,
      backgroundColor:"#fff",
      borderRadius: 60,
      justifyContent:"center",
      alignItems:"center",
      borderColor:"#C0C0C0",
      borderWidth:1,
    },
    addText:{},
});
