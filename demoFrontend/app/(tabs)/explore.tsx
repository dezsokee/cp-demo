import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Form from '@/components/Form';

export default function TabTwoScreen() {

  const [brand, setBrand] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [constructionYear, setConstructionYear] = useState<string>("");

  const navigation = useNavigation();

  const addVehicle = async (brand : string, constructionYear : string, type : string) => {
    try {
      const response = await axios.post("http://10.1.95.46:8080/api/v1/vehicle/addNewVehicle", {
        brand: brand,
        conYear: constructionYear,
        type: type
      });

      Alert.alert(
        "Success",
        "Vehicle added successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('index' as never)
          }
        ]
      );

      setBrand('');
      setType('');
      setConstructionYear('');

    } catch (error) {
      if ((error as any).response) {
        console.error('Error response data:', (error as any).response.data);
        console.error('Error response status:', (error as any).response.status);
        console.error('Error headers:', (error as any).response.headers);

        Alert.alert(
          "Error",
          "Vehicle could not be added!",
          [
            {
              text: "OK"
            }
          ]
        );

        setBrand('');
        setType('');
        setConstructionYear('');

      } else if ((error as any).request) {
        console.error('Error request:', (error as any).request);
      } else {
        console.error('Error message:', (error as any).message);
      }
      console.error('Error config:', (error as any).config);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-4">
      <View className="p-10 bg-white border border-gray-200 rounded-tl-3xl rounded-br-3xl items-center justify-center">
        <View className="flex-row gap-2 items-center justify-center">
          <Text className="text-cyan-900 text-center font-bold text-xl mb-5">Add a new car</Text>
        </View>

        <Form formFunction={addVehicle} buttonText="ADD VEHICLE" />

      </View>
    </View>
  );
}