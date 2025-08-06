import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { router } from 'expo-router'
import { COLORS } from '@/constants/theme'
import {Ionicons} from '@expo/vector-icons'

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };


  const handleSigned=()=>{
    if (!validateForm()) return;
    Alert.alert('Account Created successfully')
    router.replace('/loginscreen')
  }
  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        <TouchableOpacity 
        onPress={()=>router.back()}
        style={styles.arrow}
        >
          <Ionicons name='arrow-undo' color={'black'} size={24}/>
      </TouchableOpacity>
      </View>
      <View style={styles.imgContainer}>
        <Image source={{uri:'https://png.pngtree.com/png-vector/20220526/ourmid/pngtree-online-registration-or-sign-up-login-for-account-on-smartphone-app-png-image_4740863.png'}}
        style={[{height:250,width:300},styles.images]}/>
      </View>
      <View style={styles.form}>
        <View style={styles.formInner}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="gray"
              style={[styles.input, errors.fullName && { borderColor: 'red' }]}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            <Text style={styles.label}>Email address</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="gray"
              style={[styles.input, errors.email && { borderColor: 'red' }]}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="gray"
              secureTextEntry
              style={[styles.input, errors.password && { borderColor: 'red' }]}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSigned}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{'  '}
              <Text style={{ color: '#1cff03' }} onPress={() => router.push('/loginscreen')}>
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor:COLORS.background,
    },
    arrowContainer:{
      alignItems:'flex-start',
      margin:15,
    },
    arrow:{
      borderTopRightRadius:10,
      borderBottomLeftRadius:10,
      backgroundColor:'yellow',
      padding:4,
    },
    imgContainer:{
      flex:1/2,
      alignItems:'center',
      justifyContent:'center'
    },
    images:{
      resizeMode: 'contain',
    },
    form:{
      flex:1,
      backgroundColor:'#c1cbe4ed',
      borderTopLeftRadius:40,
      borderTopRightRadius:40,
    },
    formInner: {
      marginVertical: 30,
      marginHorizontal:30,
      gap: 16,
    },
    label:{
        fontSize:15,
        fontWeight:'500',
        color:'#666262',
        marginHorizontal:10,
    },
    input: {
      backgroundColor: '#f2f2f2',
      padding: 14,
      borderRadius: 12,
      fontSize: 16,
    },
    button: {
      backgroundColor: 'yellow',
      padding: 16,
      alignItems: 'center',
      borderRadius: 12,
      marginTop:20,
    },
    buttonText: {
      fontWeight: '700',
      fontSize: 18,
    },
    footer:{
      alignItems:'center',
      marginTop:10,
    },
    footerText:{
      fontSize:13,
      fontWeight:'500',
      color:'black'
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginLeft: 10,
      marginTop: -10,
      marginBottom: 10,
    },
})