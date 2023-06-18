import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React , {useState} from "react";

import { Button } from "react-native-elements";
import { CheckBox } from 'react-native-elements'
//import CheckBox from '@react-native-community/checkbox';
import { useEffect } from "react";

const CameraScreen = ({navigation}) => {
    const [twitterIntegration, setTwitterIntegration] = useState(false)
    const [cameraIntgration, setCameraIntegration] = useState(false)

    return (
        <View style={styles.container}>

        <CheckBox
            title='Post to Twitter'
            checked={twitterIntegration}
            onPress={() => setTwitterIntegration(!twitterIntegration)}
        />

        <CheckBox
            title='Post Picture'
            checked={cameraIntgration}
            onPress={() => setCameraIntegration(!cameraIntgration)}
        />

    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
  });

export default CameraScreen;