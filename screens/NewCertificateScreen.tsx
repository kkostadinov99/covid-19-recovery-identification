import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert, YellowBox } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import DrawerButton from '../components/DrawerButton';
import CreateCertificate from '../network/CreateCertificate';
import { useTrackedState, Certificate, State, attributeTypeMap } from '../Store';
import HelpButton from '../components/HelpButton';
import BasicQRModal from '../components/BasicQRModal';

YellowBox.ignoreWarnings(['Animated:', 'Warning: component', 'Failed prop type']);

/*
 * The New Certificate screen is accessible only to attesters and they use it to inform an attestee of the data they want to add to the attestee's chain
*/

const options = [
    { value: "select-certificate", label: "Select Certificate..." },
    { value: "covid-immunity", label: "COVID-19 Immunity" }
]

const createNewCertificate = (creator: string, holder: string, certType: string, state: State) => {
    const certificate: Certificate = {
        creatorID: creator,
        holderID: holder,
        type: certType
    }
    if (holder) {
        CreateCertificate(certificate, state);
        Alert.alert("certificate sent!");
    }
    else {
        Alert.alert(
            'Failure',
            'Please enter ID',
            [
                {
                    text: 'Understood',
                    style: 'cancel',
                },
            ],
            { cancelable: true },
        );
    }
}

const NewCertificateScreen: React.FC = () => {
    const [certificateType, setCertificateType] = useState(1)
    const [holderID, setHolderID] = useState("")
    const [codeVisible, setCodeVisible] = useState(false)
    const state = useTrackedState()

    const options =attributeTypeMap

    return (
        <View style={state.darkMode ? styles.dark : styles.light}>
            <View style = {state.darkMode ? styles.headerDark : styles.header}>
                <Text style = {state.darkMode ? styles.darktext : styles.lighttext}>New Certificate</Text>
                <Text style={state.darkMode ? styles.subtitleDark : styles.subtitle}>Here you can inform a holder of what data you want to add to their chain</Text>
            </View>

            <View style={state.darkMode ? styles.dropdownDark : styles.dropdown} >
                <Dropdown
                    data={options}
                    label="Choose..."
                    onChangeText={(value: string, index: number) => setCertificateType((index))} >
                </Dropdown>
            </View>

            <Button
                accessibilityStates
                mode="contained"
                style={{backgroundColor:'dodgerblue', marginVertical:5}}
                onPress={() => {
                    setCodeVisible(true)
                }} >
                GENERATE QR CODE
            </Button>

            {/* <QRModal visible={scannerVisible} setVisible={setScannerVisible} onRead={setHolderID}/> */}
            <BasicQRModal data={JSON.stringify({id:state.ID,type:certificateType })} visible={codeVisible} setVisible={setCodeVisible}/>
            <DrawerButton />
            <HelpButton />
        </View>
    )
}

/**
 * various styles for use in various situations. For example, white text in a potential
 * dark mode or black text in the current light mode.
 */
const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: '#fff',
        fontSize: 15,
        fontFamily: "Sans-serif",
        color: "#000",
        borderWidth: 1,
        margin: 0,
        padding: 5,
        justifyContent: 'center',
        width: 200
    },
    dropdownDark: {
        backgroundColor: '#222',
        fontSize: 15,
        fontFamily: "Sans-serif",
        color: "#000",
        borderWidth: 1,
        margin: 0,
        padding: 5,
        justifyContent: 'center',
        width: 200
    },
    textInput: {
        margin: 10,
        width: 200,
        height: 100,
        borderColor: "#000",
        borderWidth: 1
    },
    textInputDark: {
        backgroundColor: "#222",
        color: "#fff",
        margin: 10,
        width: 200,
        height: 100,
        borderColor: "#000",
        borderWidth: 1
    },
    darktext: {
        position: "relative",
        marginTop: "3%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        marginTop: "3%",
        marginBottom: "5%",
        fontWeight: "bold",
        fontSize: 40,
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
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30
    },
    headerDark: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
        color: "#fff"
    },
    subtitle: {
        fontSize: 15,
        margin: 5,
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    },
    subtitleDark: {
        fontSize: 15,
        margin:5,
        fontFamily: "Sans-serif",
        color: "#fff",
        textAlign: 'center',
        justifyContent: 'center'
    }
});

export default NewCertificateScreen
