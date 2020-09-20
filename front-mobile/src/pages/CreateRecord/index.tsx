import React, { useState, useEffect } from 'react';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { StyleSheet, TextInput, View, Text, Alert } from 'react-native';
import Header from '../../components/Header'
import PlatformCard from './PlatformCard'
import { Game, GamePlatform } from './types';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const placeholder = {
  label: 'Selecione o game',
  value: null
}

const BASE_URL = 'https://sds1-eliton.herokuapp.com';

const mapSelectValues = (games: Game[]) => {
  return games.map(game =>({
    ...game,
    label: game.title,
    value: game.id
  }));
}

const CreateRecord = () => {
  // Criando um estado para armazenar o que o Usuario Digitou, Nome e Idade
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // criando um estado para armazenar o jogo selecionado pelo usuário
  const [selectedGame, setSelectGame] = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);

  // Para Filtrar os games de acordo com a plataforma que o Usuário escolher
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  // para alterar a cor dos botões quando os mesmos forem selecionados
const [platform, setPlatform] = useState<GamePlatform>();
const handleChangePlatform = (selectedPlatform: GamePlatform) => {
   setPlatform(selectedPlatform);
   
   //Games filtrado de acordo com a escolha da plataforma
   const gamesByPlatform = allGames.filter(
     game => game.platform === selectedPlatform
   )
   setFilteredGames(gamesByPlatform);
}

// Enviando o dados informados para registo no banco de Dados
const handleSubmit =() =>{
  const payLoad = { name, age, gameId: selectedGame };
  axios.post(`${BASE_URL}/records`, payLoad)
    .then (() => {
      Alert.alert('Dados Salvos com Sucesso!!!');
      setName('');
      setAge('');
      setSelectGame('');
      setPlatform(undefined );
    })
    .catch(() => Alert.alert('Algo deu Errado!! :( Informações não salvas!!'))
}

// Buscandos os dados de Games na API, a conexão com o backEnd é através do Axios
useEffect (() => {
  axios.get(`${BASE_URL}/games`)
    .then(response => {
      //Buscando os games
      const selectValues = mapSelectValues(response.data);
      console.log(selectValues);
      setAllGames(selectValues);
    })
    // caso dê algum erro
    .catch(() => Alert.alert('Erro ao Listas os Jogos!'))
},[]);


    return (
        <>
        <Header />
         <View style={styles.container}>
           <TextInput style={styles.inputText} placeholder="Nome"
           placeholderTextColor="#9e9e9e"
           maxLength={30}
           onChangeText={text => setName(text)}
           value={name}
           />
           
           <TextInput 
           keyboardType="numeric"
           style={styles.inputText} placeholder="Idade"
           placeholderTextColor="#9E9E9E"
           maxLength={3}
           onChangeText={text => setAge(text)}
           value={age}
           />
           <View style={styles.platformContainer}>
              <PlatformCard 
                platform="PC"
                icon="laptop"
                onChange={handleChangePlatform}
                activePlatform={platform}/>
              <PlatformCard 
                platform="XBOX"
                icon="xbox"
                onChange={handleChangePlatform}
                activePlatform={platform}/>
              <PlatformCard 
                platform="PLAYSTATION"
                icon="playstation"
                onChange={handleChangePlatform}
                activePlatform={platform}/>
          </View>
          <RNPickerSelect 
            useNativeAndroidPickerStyle={false}
            onValueChange={value => {
              setSelectGame(value);
            }}
            placeholder={placeholder} 
            value={selectedGame}
            items={filteredGames}
            style={pickerSelectSty}
            Icon={() =>{
              return <Icon name="chevron-down" color="#9e9e9e" size={25}/>
            }}
            />  

          <View style={styles.footer}>
            <RectButton style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                SALVAR
              </Text>
            </RectButton>

          </View>


         </View>

         </>       
         
    );
}

// CSS
const pickerSelectSty = StyleSheet.create(
  {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    placeholder: {
      color: '#9E9E9E',
      fontSize: 16,
      fontFamily: "Play_700Bold",
    },
    iconContainer: {
      top: 10,
      right: 12,
    }
  }
);

const styles = StyleSheet.create (
    {
        container: {
          marginTop: '15%',
          paddingRight: '5%',
          paddingLeft: '5%',
          paddingBottom: 50
        },
        inputText: {
          height: 50,
          backgroundColor: '#FFF',
          borderRadius: 10,
          color: '#ED7947',
          fontFamily: "Play_700Bold",
          fontSize: 16,
          paddingLeft: 20,
          marginBottom: 21
        },
        platformContainer: {
          marginTop: 10,
          marginBottom: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        footer: {
          marginTop: '6%',
          alignItems: 'center',
        },
        button: {
          backgroundColor: '#00D4FF',
          flexDirection: 'row',
          marginTop: 10,
          borderRadius: 10,
          height: 60,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        },
        buttonText: {
          fontFamily: "Play_700Bold",
          fontWeight: 'bold',
          fontSize: 18,
          color: '#0B1F34',
        }
      }
);

export default CreateRecord