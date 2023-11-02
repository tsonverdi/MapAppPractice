import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import MapView, {Marker} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../store';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import DateTimePicker from "@react-native-community/datetimepicker"

const NewPhotoScreen = ({route}) => {
    const {photoUri} = route.params;
    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState();
    const {photoList, setPhotoList} = useContext(MyContext)
    const [info, setInfo] = useState();

    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)

    handleMapPress = (event) => {
        const {coordinate} = event.nativeEvent;
        setSelectedLocation(coordinate);
        
    }
    const addPhoto = () => {
        photoObj={
            photoUri: photoUri,
            location: selectedLocation,
            info: info,
            date: date.toLocaleDateString()
        }
        setPhotoList([...photoList,photoObj])
        
        
         navigation.navigate("Home");
    }
    const onChange = (event,selectedDate) => {
        const currentDate= selectedDate || date; 
        setDate(currentDate);
        setShowPicker(false)  //close the picker for ios
    }
  return (
    <View style={styles.container}>
      <Image source={{uri:photoUri}} style={styles.imageItem}></Image>

      <TextInput placeholder="Bilgi Yaziniz" style={styles.textInput} value={info} onChangeText={(value)=> setInfo(value)}></TextInput>
      <Text style={{fontWeight:"bold"}}>Konum Bilgisi Ekle: </Text>

      <MapView style={styles.maps} onPress={handleMapPress} zoomControlEnabled={true}> 

      {selectedLocation ? 
      <Marker coordinate={selectedLocation}> 
            <View style={styles.marker}>
                <Icon name="map-marker-check-outline" color={"white"} size={35}/>
                </View>
      </Marker>: 
      <View/>} 

      </MapView>
      <Text style={{fontWeight:"bold"}}>Tarih Bilgisi Ekle</Text>

      <Text>{date.toLocaleDateString()}</Text>

      <Button title="Tarih Sec" onPress={()=>setShowPicker(true)}/>
      {showPicker && 
      <DateTimePicker 
      value={date} 
      mode='date' 
      onChange={onChange} /> }
      
      
    
    <View style={{flexDirection:"row", marginTop:20}} gap={15}>
    <Button title="Iptal" color={"red"} onPress={()=> navigation.goBack()}/>
    <Button title="Save" color={"green"} onPress={addPhoto}/>
    </View>
    </View>
  )
}

export default NewPhotoScreen

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',

    },
    imageItem:{
        width:150, height:150, marginVertical:15,borderRadius:10
    },
    maps:{
        width:"75%", height:200
    },
    marker:{
        backgroundColor:'blue',
        borderRadius:30,
        borderColor:"white",
        borderWidth:2,
        padding:3

    },
    textInput:{
        borderWidth:1,
        borderColor:"gray",
        paddingHorizontal:20,
        paddingVertical:3,
        marginBottom:10,
    }
})