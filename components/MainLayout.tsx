import { COLORS } from "@/constants/theme"
import { useAuth } from "@clerk/clerk-expo"
import { router, Stack, useSegments, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Platform, StatusBar, View, ActivityIndicator } from "react-native"

export default function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth()
    const segments = useSegments()
    const router = useRouter()
    const [isNavigationReady, setIsNavigationReady] = useState(false)

    // Wait for both auth and navigation to be ready
    useEffect(() => {
        if (isLoaded) {
        // Small delay to ensure router is fully initialized
        const timer = setTimeout(() => {
            setIsNavigationReady(true)
        }, 150)
        
        return () => clearTimeout(timer)
        }
    }, [isLoaded])

    useEffect(() => {
        // Only run navigation logic when everything is ready
        if (!isLoaded || !isNavigationReady) return

        const isAuthScreen = segments[0] === '(auth)'
        
        // Use a more robust navigation approach
        const handleNavigation = async () => {
        try {
            if (!isSignedIn && !isAuthScreen) {
            // Use push instead of replace to avoid route conflicts
            await router.push('/(auth)/index')
            } else if (isSignedIn && isAuthScreen) {
            await router.push('/homepage')
            }
        } catch (error) {
            console.error('Navigation error:', error)
            // Fallback navigation
            if (!isSignedIn) {
            router.push('/(auth)/index')
            } else {
            router.push('/homepage')
            }
        }
        }

        // Additional delay to prevent race conditions
        const navigationTimer = setTimeout(handleNavigation, 100)
        
        return () => clearTimeout(navigationTimer)
    }, [isLoaded, isSignedIn, segments, isNavigationReady])

    // Show loading until everything is ready
    if (!isLoaded || !isNavigationReady) {
        return (
        <View style={styles.loadingContainer}>
            <StatusBar 
            barStyle="light-content" 
            backgroundColor={COLORS.background}
            translucent={false}
            />
            <ActivityIndicator size="large" color="#a8e22c" />
        </View>
        )
    }

    return (
        <View style={styles.container}>
        <StatusBar 
            barStyle="light-content" 
            backgroundColor={COLORS.background}
            translucent={false}
        />
        <Stack 
            screenOptions={{ 
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
            }} 
        />
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0,
    },
}