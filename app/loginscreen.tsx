import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { COLORS } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'

// Complete the auth session for web browser
WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
    const [loading, setLoading] = useState<boolean>(false)
    
    // Use separate OAuth hooks for better reliability
    const { startOAuthFlow: googleOAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: appleOAuth } = useOAuth({ strategy: 'oauth_apple' })
    const { startOAuthFlow: facebookOAuth } = useOAuth({ strategy: 'oauth_facebook' })

    const LOGIN_ERROR_TITLE = "Login Error"
    const LOGIN_ERROR_MESSAGE = "Something went wrong. Please try again."

    const handleSSOLogin = async (provider: 'google' | 'apple' | 'facebook') => {
        setLoading(true)
        try {
            let result
            
            switch (provider) {
                case 'google':
                    result = await googleOAuth()
                    break
                case 'apple':
                    result = await appleOAuth()
                    break
                case 'facebook':
                    result = await facebookOAuth()
                    break
                default:
                    throw new Error('Invalid provider')
            }

            const { createdSessionId, setActive } = result

            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId })
                router.replace('/homepage')
            } else {
                // Handle cases where user might need to complete additional steps
                console.log('Session not created, might need additional verification')
            }
        } catch (error: any) {
            console.error(`SSO-error-${provider}`, error)
            
            // Handle specific error cases
            if (error?.code === 'oauth_access_denied' || error?.message?.includes('cancelled')) {
                // User cancelled the OAuth flow - don't show error
                return
            }
            
            if (error?.code === 'session_exists') {
                // Session already exists, redirect to homepage
                router.replace('/homepage')
                return
            }
            
            // Show error for actual failures
            Alert.alert(LOGIN_ERROR_TITLE, `${provider.charAt(0).toUpperCase() + provider.slice(1)} ${LOGIN_ERROR_MESSAGE.toLowerCase()}`)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <View style={[styles.loading, styles.container]}>
                <ActivityIndicator color={'white'} size={'large'}/>
                <Text style={styles.loadingText}>Signing you in...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.arrowContainer}>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    style={styles.arrow}
                >
                    <Ionicons name='arrow-undo' color={'black'} size={24}/>
                </TouchableOpacity>
            </View>
            <View style={styles.imgContainer}>
                <Image 
                    source={{uri:'https://www.pngall.com/wp-content/uploads/15/Login.png'}}
                    style={[{height:250,width:300},styles.images]}
                />
            </View>
            <View style={styles.form}>
                <View style={styles.formInner}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        placeholder="johndoe@gmail.com"
                        placeholderTextColor="gray"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="******"
                        placeholderTextColor="gray"
                        style={styles.input}
                        secureTextEntry
                        autoComplete="password"
                    />
                    <TouchableOpacity onPress={() => Alert.alert('Want to Reset the password?')}>
                        <Text style={{textAlign:'right',fontSize:14,}}>Forget Password?</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => router.replace('/homepage')}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:20,fontWeight:'600',textAlign:'center'}}>OR</Text>
                    <View style={styles.icons}>
                        <TouchableOpacity 
                            onPress={() => handleSSOLogin("google")}
                            disabled={loading}
                            style={[styles.iconButton, loading && styles.disabledButton]}
                        >
                            <Ionicons name='logo-google' size={35} color={loading ? '#ccc' : '#DB4437'}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => handleSSOLogin("apple")}
                            disabled={loading}
                            style={[styles.iconButton, loading && styles.disabledButton]}
                        >
                            <Ionicons name='logo-apple' size={35} color={loading ? '#ccc' : '#000'} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => handleSSOLogin("facebook")}
                            disabled={loading}
                            style={[styles.iconButton, loading && styles.disabledButton]}
                        >
                            <Ionicons name='logo-facebook' size={35} color={loading ? '#ccc' : '#4267B2'} />
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
        backgroundColor: COLORS.background,
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
    iconButton: {
        padding: 8,
        borderRadius: 8,
    },
    disabledButton: {
        opacity: 0.6,
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
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#d5cccc',
        marginTop: 10,
    },
})