import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps';

const PhotoDetail = ({route}) => {
    const {item} = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.imageItem}
            source={{uri:item.photoUri}}/>
        <Text>Bilgi: {item.info}</Text>

            <Text style={{fontWeight: 'bold'}}>Konum Bilgisi:</Text>
        {item.location ? 
         <MapView style={styles.map}  zoomControlEnabled={true} initialRegion={{
            latitude:item.location.latitude,
            longitude:item.location.longitude,
            latitudeDelta:0.592,
            longitudeDelta:0.4421,
        }}><Marker coordinate={item.location} pinColor="green"/></MapView> : <Text>Konum Bulunamadi</Text> } 
       
        <Text style={{ fontWeight: "bold" }}>Tarih Bilgisi:</Text>
        <Text>{item.date}</Text>

        
    </View>
  )
}

export default PhotoDetail;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },
    map:{
        width:"100%", height:200
    },
    imageItem:{
        width:150, height:150,
        marginVertical:15
    }
})