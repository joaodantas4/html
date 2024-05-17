import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function App() {
  const[foto, setFoto] = useState (null);

function openAlbum(){
  const options ={
    mediaType: "photo",
    quality:1,
    SelectionLimit:1
  }
  launchImageLibrary(options,(response)=> {
    if(response.didCancel){
      console.log("IMAGE PICKER CANCELADO")
      return;
    }else if (response.error){
      console.log("GEROU ERRO", response.errorMessage)
      return;
    }
    console.log(response.assets)
    setFoto(response.assets[0].uri)
  })
}

async function openCamera(){
  const options={
    mediaType:"photo",
    quality:1,
    saveToFotos: true,
  }
  const response = await launchCamera(options)

  setFoto(response.assets[0].uri)
}


   return (
    <SafeAreaView style={estilos.container}>
      <View style ={estilos.botoes}>
        
        <TouchableOpacity style={estilos.botaoAlbum} onPress={openAlbum}>
          <text style={estilos.texto}> Abrir Album </text>
        </TouchableOpacity >

        <TouchableOpacity style={estilos.botaoCam} onPress={openCamera}>
          <text style={estilos.texto}> Abrir Camera </text>
        </TouchableOpacity>

       
      
      </View>
      {foto!== null && (
      <image source={{uri:foto}} style={estilos.foto}/>
    )}
    </SafeAreaView>

      
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  botoes:{
    marginTop:144,
    flexDirection:'row',
    gap:20,
    marginBottom:25
  },
  botaoAlbum:{
    backgroundColor:'#7bb4e3',
    padding: 4,
    paddingHorizontal: 15,
    borderRadius: 4

  },
  botaoCam:{
    backgroundColor:'#ff7600',
    padding: 4,
    paddingHorizontal: 15,
    borderRadius: 4

  },
  texto:{
    color:'#fff',
    fontWeight: 'bold'
  },
  foto:{
    width: '90%',
    height:300,
    borderWidth:1,
    borderColor:'#bb2ec',
  }
});
