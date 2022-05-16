import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';


const ListItem = ({ reminder, deleteReminder, openDetails }) => {
  return (
    <TouchableOpacity onPress={() => openDetails(reminder)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{reminder.id} - {reminder.title}</Text>
        <Button
          title='Delete'
          color='#8A0808'
          onPress={() => deleteReminder(reminder)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(67,84,96,0.15)',
  },
  itemText: {
    fontSize: 18,
  },
});

export default ListItem;
