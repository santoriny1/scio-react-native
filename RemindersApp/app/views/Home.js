import React from 'react'
import {
  Button,
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
} from 'react-native';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
REMINDER
id: int
title: string
notes: string
time: date - timestamp
*/


const Home = ({ navigation, name = 'Jona' }) => {
  const [reminders, setReminders] = React.useState([])

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
      time: new Date().getTime()
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
      <Button
        title="Go to my profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jona' })
        }
      />
      <Button
        color="#380B61"
        title="Add Reminder"
        onPress={addReminder}
      />
      <Image source={{ uri: "https://picsum.photos/400" }} style={styles.image} />
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
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  listContainer: {
    flex: 1,
  },
})

export default Home
