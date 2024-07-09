import { Text, View } from 'react-native'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'

type FormFunction = (param1: string, param2: string, param3: string) => void;

type FormProps = {
    formFunction: FormFunction;
    buttonText: string;
  }

export default function Form({formFunction, buttonText}: FormProps) {

    const [brand, setBrand] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [constructionYear, setConstructionYear] = useState<string>("");

    return (
        <View className="space-y-4">
            <View>
                <Text className="font-thin italic mb-1">Brand*</Text>
                <TextInput
                    value={brand}
                    onChangeText={setBrand}
                    placeholder="Enter car brand"
                    className="border border-gray-300 rounded p-2 rounded-br-3xl mb-2"
                />
            </View>

            <View>
                <Text className="font-thin italic mb-1">Type*</Text>
                <TextInput
                    value={type}
                    onChangeText={setType}
                    placeholder="Enter car type"
                    className="border border-gray-300 rounded p-2 rounded-br-3xl mb-2"
                />
            </View>

            <View>
                <Text className="font-thin italic mb-1">Construction year*</Text>
                <TextInput
                    value={constructionYear}
                    onChangeText={setConstructionYear}
                    placeholder="Enter construction year (yyyy-mm-dd)"
                    keyboardType="numeric"
                    className="border border-gray-300 rounded p-2 mb-4"
                />
            </View>

            <TouchableOpacity>
                <View className="bg-white p-3 rounded-3xl border-2 border-cyan-900 w-60 ">
                    <Text className="text-cyan-900 text-center font-bold text-base" onPress={() => formFunction(brand, constructionYear, type)}>{buttonText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}