import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';


const Dashboard: React.FC = () => {
    return (
        <View style={styles.light}>
            <Text style={styles.lighttext}>My Dashboard{"\n"} {"\n"}{"\n"}</Text>
            <Text style={styles.certificate}>&nbsp;&nbsp;Certificate: immunity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
           <Text>{"\n"}</Text> 
            <Text style={styles.certificate}>&nbsp;&nbsp;Certificate: health care professional &nbsp;</Text>
            <DrawerButton></DrawerButton>
        </View>
    )
}

const styles = StyleSheet.create({
    darktext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",
       
        fontSize: 60,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",
      
        fontSize: 60,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    dark: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center'
    },
    light: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    certificate: {
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 10,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Sans-serif"
    }
});

export default Dashboard
