import { View, Alert, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import Form from '@/components/Form';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Editscreen = () => {

    const navigation = useNavigation();

    const { edit } = useLocalSearchParams();

    const editVehicle = async (brand: string, constructionYear: string, type: string) => {
        try {
            const response = await axios.put("http://10.1.95.46:8080/api/v1/vehicle/update/" + edit, {
                brand: brand,
                conYear: constructionYear,
                type: type
            });

            Alert.alert(
                "Success",
                "Vehicle updated successfully!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('index' as never)
                    }
                ]
            );


        }
        catch (error) {
            if ((error as any).response) {
                console.error('Error response data:', (error as any).response.data);
                console.error('Error response status:', (error as any).response.status);
                console.error('Error headers:', (error as any).response.headers);

                Alert.alert(
                    "Error",
                    "Vehicle could not be edited!",
                    [
                        {
                            text: "OK"
                        }
                    ]
                );

            } else if ((error as any).request) {
                console.error('Error request:', (error as any).request);
            } else {
                console.error('Error message:', (error as any).message);
            }
            console.error('Error config:', (error as any).config);
        }
    }

    return (
        <View className="flex-1 bg-gray-100 items-center justify-center p-4">
            <View className="p-10 bg-white border border-gray-200 rounded-tl-3xl rounded-br-3xl items-center justify-center">
                <Form formFunction={editVehicle} buttonText='EDIT' />
                <TouchableOpacity onPress={() => {navigation.navigate('index' as never)}}>
                    <View className="bg-cyan-900 p-2 rounded-3xl w-40 mt-6">
                        <Text className="text-white text-center ">GO BACK TO HOME</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Editscreen