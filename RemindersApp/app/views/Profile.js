import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';

const Profile = ({ navigation, route }) => {

  let STORAGE_KEY1 = 'user_image'
  let STORAGE_KEY2 = 'user_phone'
  let STORAGE_KEY3 = 'user_description'

  const [image, setImage] = useState('https://picsum.photos/410')
  const [phone, setPhone] = useState()
  const [description, setDescription] = useState()

  const saveData1 = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY1, image)
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const saveData2 = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY2, phone)
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const saveData3 = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY3, description)
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const readData1 = async () => {
    try {
      const value1 = await AsyncStorage.getItem(STORAGE_KEY1);
  
      if (value1 !== null) {
        setImage(value1);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }

  const readData2 = async () => {
    try {
      const value2 = await AsyncStorage.getItem(STORAGE_KEY2);
  
      if (value2 !== null) {
        setPhone(value2);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }

  const readData3 = async () => {
    try {
      const value3 = await AsyncStorage.getItem(STORAGE_KEY3);
  
      if (value3 !== null) {
        setDescription(value3);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }

  useEffect(() => {
    readData1()
    readData2()
    readData3()
  }, [])

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
    saveData1(image)
  }

  const savePhone = () => {
    if (!phone) return
    saveData2(phone)
    setPhone('')
  }

  const saveDescription = () => {
    if (!description) return
    saveData3(description)
    setDescription('')
  }

  return (
    <ScrollView>
      <Text style={styles.title}>{route.params.name}</Text>
      <Image source={{uri: image}} style={styles.image} />
      <Button title="Pick Image" onPress={saveImage} />
      <Text style={styles.caption}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
        onSubmitEditing={savePhone}
      />
      <Text style={styles.caption}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Something about you"
        value={description}
        onChangeText={setDescription}
        onSubmitEditing={saveDescription}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
  },
  image: {
    marginTop: 30,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 140,
    height: 140,
    borderRadius: 999,
    alignSelf: 'center',
  },
  caption: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    marginLeft: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    padding: 10,
  },
});

export default Profile;
