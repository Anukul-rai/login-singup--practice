import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { COLORS } from '@/constants/theme'
import {Ionicons} from '@expo/vector-icons'

export default function LoginScreen() {
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
            <Image source={{uri:'https://www.pngall.com/wp-content/uploads/15/Login.png'}}
            style={[{height:250,width:300},styles.images]}/>
        </View>
        <View style={styles.form}>
            <View style={styles.formInner}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    placeholder="johndoe@gmail.com"
                    placeholderTextColor="gray"
                    style={styles.input}
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="******"
                    placeholderTextColor="gray"
                    style={styles.input}
                    secureTextEntry
                />
                <TouchableOpacity onPress={()=>Alert.alert('Want to Reset the password?')}>
                    <Text style={{textAlign:'right',fontSize:14,}}>Forget Password?</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>router.replace('/homepage')}>
                    <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize:20,fontWeight:'600',textAlign:'center'}}>OR</Text>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={()=>Alert.alert('Want to login with google?')}>
                        <Ionicons name='logo-google' size={35}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Alert.alert('Want to login with apple?')}>
                        <Ionicons name='logo-apple' size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Alert.alert('Want to login with facebook?')}>
                        <Ionicons name='logo-facebook' size={35} color={'blue'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                    Don't have an account?{'  '}
                    <Text style={{ color: '#70971c' }} onPress={() => router.push('/signupscreen')}>
                        Sign up
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
        backgroundColor:'#a8e22c',
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
        backgroundColor:'#e2e8f7eb',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
    },
    formInner: {
        marginVertical: 30,
        marginHorizontal:20,
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
        borderRadius: 15,
        fontSize: 16,
    },
    button:{
        backgroundColor:'#a8e22c',
        paddingVertical:14,
        alignItems:'center',
        borderRadius:20,
    },
    buttonText:{
        fontSize:20,
        fontWeight:'700',
    },
    icons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:30,
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

})