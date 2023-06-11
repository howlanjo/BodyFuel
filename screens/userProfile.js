import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image, ListItem } from "react-native-elements";
import React , {useState} from "react";

import { Button } from "react-native-elements";
import { useEffect } from "react";

const UserProfile = ({navigation, route}) => {
    console.log("looking for this", route.params.userInfo)
    return (
        
        <View>
            <Text>This is the user Profile</Text>
            <Text>First Name {route.params.userInfo[0].firstName}</Text>
            <Text>Last Name {route.params.userInfo[0].lastName}</Text>
            <Text>Username {route.params.userInfo[0].username}</Text>
            <Text>Bio {route.params.userInfo[0].bio}</Text>
            <Text>Gender {route.params.userInfo[0].gender}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});

export default UserProfile;