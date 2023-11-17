import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ServiceDetail = ({ navigation, route }) => {
  const id = route.params.paramKey;
  const [service, setService] = useState('');
  const [user, setUser] = useState('');

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('data');
        if (value !== null) {
          setData(JSON.parse(value));
          const apiURL = `https://kami-backend-5rs0.onrender.com/services/${id}`;
          const token = JSON.parse(value).token;

          const axiosConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };

          axios
            .get(apiURL, axiosConfig)
            .then(response => {
              setService(response.data);
              setUser(response.data.user)
            })
            .catch(error => {
              console.log('Error: ', error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Service name: {service.name}</Text>
      <Text style={styles.text}>Price: {service.price}</Text>
      <Text style={styles.text}>Creator: {user.name}</Text>
      <Text style={styles.text}>Time: {service.createdAt}</Text>
      <Text style={styles.text}>Final Update: {service.updatedAt}</Text>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  text: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
