import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'

export default function Homepage() {
    const { signOut } = useAuth()
    const { user } = useUser()
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: performLogout
                }
            ]
        )
    }

    const performLogout = async () => {
        setLoading(true)
        try {
            await signOut()
            router.replace('/')
        } catch (error) {
            console.error('Logout error:', error)
            Alert.alert("Error", "Failed to logout. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // Get user's display name
    const getDisplayName = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName}`
        }
        if (user?.firstName) {
            return user.firstName
        }
        if (user?.emailAddresses?.[0]?.emailAddress) {
            return user.emailAddresses[0].emailAddress.split('@')[0]
        }
        return 'User'
    }

    // Get user's profile image
    const getProfileImage = () => {
        return user?.imageUrl || null
    }

    return (
        <View style={styles.container}>
            {/* Main Content */}
            <View style={styles.content}>
              <View style={styles.userInfo}>
                  <View style={styles.profilePlaceholder}>
                      <Ionicons name="person" size={24} color="#fc0707" />
                  </View>
                  <View style={styles.userText}>
                      <Text style={styles.welcomeText}>Welcome back,</Text>
                      <Text style={styles.userName}>{getDisplayName()}</Text>
                  </View>
              </View>
                <View style={styles.mainSection}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark-circle" size={80} color="#a8e22c" />
                    </View>
                    
                    <Text style={styles.title}>You're all set!</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.footerButton}
                    onPress={handleLogout}
                    disabled={loading}
                >
                    <Ionicons name="log-out" size={20} color="#666" />
                    <Text style={styles.footerButtonText}>
                        {loading ? 'Signing out...' : 'Sign Out'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background || '#f5f5f5',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfo: {
      flexDirection:'row',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    profilePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    userText: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 14,
        color: '#54ff05',
        marginBottom: 2,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#faf6f6',
    },
    logoutButton: {
        backgroundColor: '#ff4757',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    mainSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    footer: {
        padding: 20,
        backgroundColor: COLORS.background,
        alignItems: 'flex-end',
    },
    footerButton: {
        borderWidth:1,
        borderColor:'yellow',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor:'#d4c7d4'
    },
    footerButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#1a1b1a',
        fontWeight: '500',
    },
})