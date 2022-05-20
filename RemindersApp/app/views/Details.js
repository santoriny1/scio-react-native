import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'react-native-image-picker'

const Details = ({ navigation, route }) => {
  const reminder = route.params.reminder
  const [title, setTitle] = useState(reminder.title)
  const [notes, setNotes] = useState(reminder.notes)
  const [time, setTime] = useState(reminder.time)
  const [image, setImage] = useState(reminder.image||'https://picsum.photos/410')
  const separator = '/'
  
  const handleSave = () => {
    const newReminder = { ...reminder }
    newReminder.title = title
    newReminder.notes = notes
    newReminder.time = time
    newReminder.image = image
    route.params.saveReminder(newReminder)
    navigation.goBack()
  }

  const [datePicker, setDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())

 function showDatePicker() {
    setDatePicker(true)
  }

  function onDateSelected(event, value) {
    setTime(value.getDate()+separator+(value.getMonth()+1)+separator+value.getFullYear())
    setDatePicker(false)
  }

  const saveImage = () => {
    if (!image) return
    ImagePicker.launchImageLibrary({mediaType: 'photo' ,maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        setImage(res.assets[0].uri)
        console.log(res.assets[0].uri.toString())    
      }
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Reminder Details</Text>
        <Text style={styles.caption}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.caption}>Notes</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
          numberOfLines={5}
          placeholder="Write something here..."
        />
        <View style={styles.form2}>
        {!datePicker && (
          <TouchableOpacity style={styles.datepicker} onPress={showDatePicker}><Text style={styles.textDate}>+</Text></TouchableOpacity>
        )}  
          <Text style={styles.caption}>Date</Text>
          <TextInput
            style={styles.input}
            value={time}
            editable={false}
          />
           { datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              is24Hour={true}
              onChange={onDateSelected}
            />
          )}
        </View>
        <Image source={{uri: image}} style={styles.image} />
        <Button title="Pick Image" onPress={saveImage} />
      </View>
      <Text></Text>
      <Button
        title='Save'
        onPress={handleSave}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form2: {
    flexDirection: "row",
    alignItems: 'center',
  },
  textDate: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
  },
  datepicker: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#1E90FF',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  form: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
    marginBottom: 20,
  },
  caption: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    marginLeft: 12,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    padding: 10,
  },
  textArea: {
    margin: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    padding: 10,
  },
  image: {
    marginTop: 30,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 140,
    height: 140,
    borderRadius: 999,
    alignSelf: 'center',
  }
});

export default Details
