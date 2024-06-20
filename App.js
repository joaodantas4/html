import { useState } from 'react';
import {
  StyleSheet, Text, View, StatusBar, TextInput, Platform, Pressable, ScrollView,
  ActivityIndicator, Alert, Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const statusBarHeight = StatusBar.currentHeight;
const OPENAI_API_KEY = ''; // Substitua pela sua chave da API do OpenAI

export default function App() {
  const [price, setPrice] = useState(100);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState("");
  const [tipoTenis, setTipoTenis] = useState("");

  async function handleGenerate() {
    if (tipoTenis.trim() === "") {
      Alert.alert("Atenção", "Digite um tipo de tênis para gerar recomendações!");
      return;
    }

    setResults("");
    setLoading(true);
    Keyboard.dismiss();

    const prompt = `Quais são as melhores opções de tênis ${tipoTenis ? "do tipo " + tipoTenis : ""} no Brasil com preços até ${price.toFixed(0)} reais? Liste as opções com o nome do tênis e o preço aproximado em formato de lista.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7, // Ajuste a temperatura para controlar a criatividade da resposta
          max_tokens: 1000, // Ajuste o número máximo de tokens para controlar o tamanho da resposta
          top_p: 1,
        })
      });
      const data = await response.json();

      if (response.ok) {
        // Processa a resposta da API para formatar em lista
        const formattedResults = data.choices[0].message.content.split('\n').map((item, index) => (
          <Text key={index} style={styles.listItem}>{item}</Text>
        ));
        setResults(formattedResults);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={styles.heading}>Recomendações de Tênis</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Preço Estimulado: <Text style={styles.price}> R$ {price.toFixed(0)} </Text></Text>
        <Slider
          minimumValue={100}
          maximumValue={1000}
          minimumTrackTintColor="#009688"
          maximumTrackTintColor="#000000"
          value={price}
          onValueChange={(value) => setPrice(value)} // Adiciona a função onValueChange
        />

        <Text style={styles.label}>Tipo de tênis:</Text>
        <TextInput
          placeholder="Ex: Running, Casual, Basquete"
          style={styles.input}
          value={tipoTenis}
          onChangeText={(text) => setTipoTenis(text)}
        />
      </View>

      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Gerar Recomendações</Text>
        <MaterialIcons name="shopping-cart" size={24} color="#FFF" />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={styles.containerScroll} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.content}>
            <Text style={styles.title}>Carregando recomendações...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {results && (
          <View style={styles.content}>
            <Text style={styles.title}>Opções de Tênis 👇</Text>
            {results} {/* Exibe a resposta da API em formato de lista */}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'blue', // Cor do título
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 54,
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#333', // Cor do label
  },
  price: {
    backgroundColor: '#F1f1f1',
    color: '#333', // Cor do preço
  },
  button: {
    backgroundColor: 'orange',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
    color: '#333', // Cor do título da lista
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  listItem: {
    marginBottom: 8,
  },
});