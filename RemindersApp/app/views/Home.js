import React from 'react'
import {
  Button,
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation, name = 'David' }) => {
  const [reminders, setReminders] = React.useState([])
  let newDate = new Date()
  let date = newDate.getDate()
  let month = newDate.getMonth() + 1
  let year = newDate.getFullYear()
  const separator = "/"

  React.useEffect(() => {
    getData()
      .then((value) => {
        console.log("VALUE", value)
        if (!!value) { setReminders(value) }
      })
      .catch((e) => console.log("ERROR", e))
  }, [])

  const addReminder = () => {
    const newId = !!reminders.length ? (reminders[reminders.length - 1].id + 1) : 1
    const newItem = {
      id: newId,
      title: 'New Reminder',
      notes: '',
      time: `${date}${separator}${month}${separator}${year}`,
      image: ''
    }
    const newReminders = [...reminders, newItem]
    setReminders(newReminders)
    storeData(newReminders)
  }

  const deleteReminder = (reminder) => {
    const newReminders = reminders.filter(item => item.id !== reminder.id)
    setReminders(newReminders)
    storeData(newReminders)
  }

  const saveReminder = (reminder) => {
    const newReminders = reminders.map(r => {
      if (r.id === reminder.id) { return reminder }
      else return r
    })
    setReminders(newReminders)
    storeData(newReminders)
  }

  const openReminder = (reminder) => {
    navigation.navigate('Details', {
      reminder: reminder,
      saveReminder: saveReminder,
    })
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('Reminders-Data', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Reminders-Data')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {name}</Text>
      <View style={styles.buttons}>
        <Button
          title="Profile"
          onPress={() =>
            navigation.navigate('Profile', { name: 'David' })
          }
        />
        <Text>   </Text>
        <TouchableOpacity style={styles.add} onPress={addReminder}><Text style={styles.text}>+</Text></TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={reminders}
          renderItem={({ item }) => <ListItem
            reminder={item}
            deleteReminder={deleteReminder}
            openDetails={openReminder}
          />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#008F39',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
  },
})

export default Home
