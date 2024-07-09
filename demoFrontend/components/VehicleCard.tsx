import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

type VehicleProps = {
    id: number;
    brand: string;
    type: string;
    conYear: Date;
    age: number;
}

export default function VehicleCard({ vehicle, onDelete }: { vehicle: VehicleProps, onDelete: () => void }) {

    const navigation = useNavigation();

    const deleteVehicle = async () => {
        try {
            const response = await axios.delete("http://10.1.95.46:8080/api/v1/vehicle/delete/" + vehicle.id);
            onDelete();
            navigation.navigate('index' as never)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Pressable className="flex-row bg-white p-4 rounded-3xl mb-4 shadow-lg border border-gray-300 items-center" onPress={() =>
            router.push({
                pathname: '(list)/[id]',
                params: { id: vehicle.id },
            })
        }>
            <View className='flex-2'>
                <Image source={require('@/assets/images/range.png')} style={styles.vehicleImage} resizeMode='cover' />
            </View>

            <View className='flex-1 px-2'>
                <Text className="text-xl mb-1 mt-2">{vehicle.brand}</Text>

                <View className="flex-row items-center gap-1">
                    <Ionicons name="car" style={styles.iconStyle} />
                    <Text className="text-m mb-2">{vehicle.type}</Text>
                </View>

                <Text className="text-sm text-gray-500">{vehicle.conYear.toString()}</Text>
            </View>

            <View className='flex-1'>
                <TouchableOpacity onPress={deleteVehicle} style={styles.deleteButton}>
                    <Ionicons name="trash" style={styles.deleteIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.editButton} onPress={() =>
                    router.push({
                        pathname: '(edit)/[edit]',
                        params: { edit: vehicle.id },
                    }) }>
                    <Ionicons name="build-outline" style={styles.deleteIcon} />
                </TouchableOpacity>
        </View>

        </Pressable >
    );
}

const styles = StyleSheet.create({
    vehicleImage: {
        width: 130,
        height: 100,
        borderRadius: 16,
        marginRight: 16,
    },
    iconStyle: {
        fontSize: 15,
        color: '#101D6B',
        marginBottom: 7,
    },
    deleteButton: {
        backgroundColor: '#FF4D4F',
        borderRadius: 16,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    deleteIcon: {
        fontSize: 20,
        color: 'white',
    },
    editButton: {
        backgroundColor: '#2d4551',
        borderRadius: 16,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginTop: 8,
    },
});
