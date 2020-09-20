import React from 'react'
import { FontAwesome5 as Icon} from '@expo/vector-icons'
import {Text, StyleSheet, View, Image, Alert} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Header from '../../components/Header'


const CreateRecord = () => {
    return (
      <>
        <Header/>
        <Text style={styles.text}>Hello</Text>
      </>
    )
}

const styles = StyleSheet.create({
    text: {
      color: '#fff'
    }
  });

export default CreateRecord