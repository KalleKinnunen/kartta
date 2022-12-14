import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'


export default function App() {
  const [address, setAddress] = useState('')
  const [coords, setCoords] = useState({ latitude: 61.187187, longitude: -149.822649 })
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=me4zCSjJZ9HptpGW4e9XoYhYXMDzZdQ9&location=${address}`

  const fetchAddressCoord = async () => {

    try {
      const response = await fetch(url)
      const data = await response.json()
      const object = data.results[0].locations[0].latLng
      setCoords({ latitude: `${object.lat}`, longitude: `${object.lng}` })

    } catch (err) {
      console.log(err)

    }
  }

  return (
    <View style={styles.container} >
      <MapView
        style={{ flex: 1, width: '100%', height: 400 }}
        region={{
          latitude: parseFloat(coords.latitude),
          longitude: parseFloat(coords.longitude),
          latitudeDelta: 0.00322,
          longitudeDelta: 0.0211
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(coords.latitude),
            longitude: parseFloat(coords.longitude),
          }}
          title='here'
        ></Marker>
      </MapView>

      <KeyboardAvoidingView behavior='padding' 
      style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <TextInput style={styles.input}
          onChangeText={text => setAddress(text)}
          value={address}
          returnKeyType="done"></TextInput>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <TouchableOpacity style={styles.button} onPress={() => fetchAddressCoord()}><Text>Näytä osoite</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setAddress('')}><Text>Tyhjennä</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  input: {
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
    margin: 2
  }
});