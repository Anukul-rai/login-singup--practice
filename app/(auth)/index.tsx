import { COLORS } from "@/constants/theme";
import { router } from "expo-router";
import { Text, View,StyleSheet, Image, TouchableOpacity } from "react-native";

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
        <View style={styles.section}>
            <Text style={styles.header}>"Let's get started"</Text>
            <View>
            <Image source={{uri:'https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png?f=webp'}} style={{height:300,width:300}}/>
            </View>
            <View style={{gap:3}}>
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={()=>router.push('/(auth)/signupscreen')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
                <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Already have an account?{'  '}
                    <Text style={{ color: '#0074b3' }} onPress={() => router.push('/(auth)/loginscreen')}>
                    Log In
                    </Text>
                </Text>
                </View>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:COLORS.background,
    alignItems:'center',
  },
  section:{
    flex:1,
    justifyContent:'space-around',
    marginVertical:20
  },
  header:{
    fontSize:30,
    textAlign:'center',
    fontWeight:'700',
    color:'#fff',
    marginTop:30,
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
  footer:{
    alignItems:'center',
    marginTop:10,
  },
  footerText:{
    fontSize:13,
    fontWeight:'500',
    color:'white'
  },
})