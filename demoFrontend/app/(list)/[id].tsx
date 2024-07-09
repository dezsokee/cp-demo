import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native'

type Vehicle = {
    id: number;
    brand: string;
    type: string;
    conYear: Date;
    age: number;
}

export default function DetailsPage() {
    const { id } = useLocalSearchParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    const fetchVehicle = async (id: number) => {
        try {
            const response = axios.get(`http://10.1.95.46:8080/api/v1/vehicle/${id}`).
                then(response => {
                    setVehicle(response.data);
                }).catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            fetchVehicle(Number(id));
        }
    }, [id]);


    return (
        <View className="flex-1 items-center justify-center p-4 m-4 border border-gray-300 rounded-lg bg-white shadow-mt-20 mt-10">

            <View className='flex-2 items-center justify-center mb-10'>
                <Text className="text-2xl font-bold text-cyan-950 mb-20">Details Page</Text>
                <Text>Vehicle ID: {id}</Text>
                <Text>Brand: {vehicle?.brand}</Text>
                <Text>Type: {vehicle?.type}</Text>
                <Text>Construction Year: {vehicle?.conYear.toString()}</Text>
            </View>


            <TouchableOpacity className="bg-white p-3 rounded-3xl border-2 border-cyan-900 w-60 " onPress={() => router.replace({ pathname: '/(tabs)' })}>
                <Text className="text-cyan-900 text-center font-bold text-base">Go back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}