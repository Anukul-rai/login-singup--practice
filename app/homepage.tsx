import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/theme'

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text>homepage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:COLORS.background,
    alignItems:'center'
  },
})