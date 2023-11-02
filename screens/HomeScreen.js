import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import MyContext from '../store'
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const {photoList,setPhotoList} = useContext(MyContext);
    const navigation = useNavigation();
    
    const takeImageFromCamera = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          Alert.alert("Please select a media library permission")
          return;
        }
        let result = await ImagePicker.launchCameraAsync({});
        if (!result.canceled){
            navigation.navigate("NewPhoto",{photoUri : result.assets[0].uri})
          //setPhotoList([...photoList,result.assets[0].uri]);
        }
      }
      
      const selectFromGallery = async () => {
        const permissionResult = await ImagePicker.launchImageLibraryAsync();
        if (!permissionResult.canceled){
            navigation.navigate("NewPhoto",{photoUri : permissionResult.assets[0].uri})
          //setPhotoList([...photoList,permissionResult.assets[0].uri]);
        }
      
      }
      
      const removePhoto =  (photoUri) => {
         setPhotoList(photoList.filter(item => item !== photoUri));
      }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Fotograf Yukle</Text>
      <View style={{flexDirection:"row", justifyContent:"center"}} gap={15}>
      <Button title="Galeriden Sec" onPress={selectFromGallery}/>
      <Button title="Kameradan Cek" onPress={takeImageFromCamera}/>
      </View>

      {/* fotolar */}
      <Text style={styles.title}>Fotograflarim</Text>
      <FlatList data={photoList} numColumns={2} contentContainerStyle={styles.imageList}
      keyExtractor={(item)=> item}
      renderItem={({item})=>(
      <View style={{marginRight:10,marginBottom:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Details",{item:item})}>
            <Image style={styles.imageItem} source={{uri: item.photoUri}}/> 
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>removePhoto(item)}>
          <Text style={{textAlign: 'center'}}>Sil</Text>
          </TouchableOpacity>
          </View>)}>
        
      </FlatList>
      <Text style={{textAlign: 'center',marginBottom:20}}>{photoList.length} photo(s) present</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:10
      },
      title:{
        fontSize:22,
        fontWeight: 'bold',
        marginVertical:15,
        textAlign: 'center'
      },
      imageItem:{
        width:150,
        height:150,
        borderRadius:10
      },
      imageList:{
        alignItems:'center',
      }
})