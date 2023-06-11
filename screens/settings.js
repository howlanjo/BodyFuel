import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image, ListItem } from "react-native-elements";
import React , {useState} from "react";

import { Button } from "react-native-elements";
import { useEffect } from "react";

const UserSettings = ({navigation}) => {
    return (
        <View>
            <Text>This is the home page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});

export default UserSettings;