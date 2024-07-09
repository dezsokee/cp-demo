import { Image, StyleSheet, View, Text } from 'react-native';
import React, { useState, useCallback } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import axios from 'axios';
import VehicleCard from '@/components/VehicleCard';
import { useFocusEffect } from 'expo-router';

type Vehicle = {
  id: number;
  brand: string;
  type: string;
  conYear: Date;
  age: number;
}

export default function HomeScreen() {

  const [vehicle, setVehicle] = useState<Vehicle[]>([]);

  const fetchVehicles = useCallback(() => {
    axios.get('http://10.1.95.46:8080/api/v1/vehicle/vehicles')
      .then(response => {
        setVehicle(response.data);
      }).catch(error => {
        console.error(error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchVehicles();
    }, [fetchVehicles])
  );

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }} headerImage={
      <Image source={require('@/assets/images/bmw.jpg')} style={styles.reactLogo} />
    }>
      <View className="flex-1 justify-center items-center">
        <View className="flex-row items-center gap-2">
          <Text className="font-bold text-3xl mb-4 text-cyan-950">Scroll for the cars...</Text>
        </View>
      </View>

      <View className="gap-2 mb-2">
        {
          vehicle.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onDelete={fetchVehicles}/>
          ))
        }
      </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
