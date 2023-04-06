import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const renkUret = () => {
    // Rastgele renk RGB renk değeri oluşturalım.
    let renk = Math.floor(Math.random() * (16777216 + 1))
      .toString(16)
      .toUpperCase();
    // Oluşturduğumuz değerin karakter sayısı
    // 6 dan küçük ise baştarafını
    // 0 ile dolduralım.
    while (renk.length < 6) renk = '0' + renk;
    // Renk kodunun başına # ekleyelim
    renk = '#' + renk;
    // Tam rengi regi dönderelim
    return renk;
  };

  function addTodo() {
    if (input.trim() !== '') {
      setTodos([...todos, { id: Date.now().toString(), text: input.trim() }]);

      styles.todo.backgroundColor = renkUret();

      setInput('');
    }
  }

  function deleteTodo(id) {
    Alert.alert('Delete To Do', 'Are you sure?', [
      { text: 'İptal', style: 'iptal_style' },
      {
        text: 'OK',
        onPress: () => setTodos(todos.filter((todo) => todo.id !== id)),
      },
    ]);
  }

  function deleteList() {
    Alert.alert('Reset List', 'Are you sure?', [
      { text: 'Hayır' },
      { text: 'Evet', onPress: () => setTodos([]) },
    ]);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="To Do Add"
        value={input}
        onChangeText={setInput}
      />

      <View style={styles.list}>
        <TouchableOpacity onPress={addTodo}>
          <Text style={styles.eklebutton}> Listeye Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteList}>
          <Text style={styles.eklebutton}> Listeyi Sil</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}> Delete X </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingTop: 10,
    marginBottom: 20,
  },

  eklebutton: {
    fontSize: 18,
    color: 'pink',
    borderRadius: 3,
    marginBottom: 20,
  },

  todo: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
    borderButtomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    paddingLeft: 10,
    paddingRigth: 12,
  },

  todoText: {
    fontSize: 18,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },

  list: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
  },
});
