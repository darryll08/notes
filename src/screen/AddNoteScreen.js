import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Icon } from 'react-native-elements'
import realm from '../../store/realm'
import { HeaderComponent, MainComponent } from '../components/NoteComponent'

const AddNoteScreen = (props) => {
  const { navigation } = props

  const [tempNote, setTempNote] = useState('')

  const getCurrentDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const currentDate = new Date();
    const dateOnly = String(currentDate.getDate()).padStart(2, '0');
    const monthOnly = currentDate.getMonth();
    const yearOnly = currentDate.getFullYear();
    // Time UTC+7
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${dateOnly} ${months[monthOnly]}, ${yearOnly} - ${hours}:${minutes}:${seconds}`
  };
  
  const saveNote = (newNote) => {
    const allData = realm.objects('Note')
    const dataLength = allData.length
    let lastIdFromRealm = 0

    if (dataLength !== 0) {
      lastIdFromRealm = allData[dataLength - 1].id
    }

    if (newNote !== ''){
      realm.write(() => {
        realm.create('Note', {
          id: dataLength === 0 ? 1 : lastIdFromRealm + 1,
          note: newNote,
          date: new Date().toISOString()
        })
      })
      navigation.navigate('NoteList')
    } else {
      alert('Note cannot be empty')
    }
  }

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent
        title="Create"
        onPress={() => saveNote(tempNote)}
      />
      <MainComponent
        date={getCurrentDate()}
        onChangeText={(text) => setTempNote(text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
})

export default AddNoteScreen