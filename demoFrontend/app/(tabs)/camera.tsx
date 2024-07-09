import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { usePermissions } from 'expo-media-library';

export default function CameraScreen() {

    const [facing, setFacing] = useState<'front' | 'back'>('back');

    useEffect(() => {
        handleContinue();
    }, []);

    const [cameraPermission, requestcameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = usePermissions();

    const requirePermissions = async () =>{
        const cameraStatus = await requestcameraPermission();

        if (!cameraStatus.granted) {
            Alert.alert('Permission required', 'Please allow camera permission to use this feature');
            return false;
        }

        const mediaStatus = await requestMediaLibraryPermission();

        if (!mediaStatus.granted) {
            Alert.alert('Permission required', 'Please allow media library permission to use this feature');
            return false;
        }

        return true;
    }

    const handleContinue = async () => {
        const hasPermissions = await requirePermissions();

        if (hasPermissions) {
            console.log('Permissions granted');
        }
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});