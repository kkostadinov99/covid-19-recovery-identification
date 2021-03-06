import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, SafeAreaView} from 'react-native';
import DrawerButton from '../components/DrawerButton';
import {useTrackedState} from '../Store';
import {FlatList} from 'react-native-gesture-handler';
import CertificateView from '../components/CertificateView';
import {Button} from 'react-native-paper';
import BasicQRModal from '../components/BasicQRModal';
import QRScannerModal from '../components/QRScannerModal';
import CertificationDialogue from '../components/CertificationDialgoue';
import AllowVerificationDialogue from '../components/AllowVerificationDialogue';
import {useFocusEffect} from '@react-navigation/native';

/*
 * The Dashboard is the entry point to the app and displays the user's stored proofs.
 */

const getAttributes = (url: string, setAttributes: Function, jwt: string) => {
  const data = {method: 'GET', headers: {Authorization: jwt}, body: ''};
  fetch(url, data)
      .then((response) => response.json())
      .then((json) => setAttributes(json))
      .catch((error) => console.error(error));
};

const B = (props: any) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

const Dashboard: React.FC = () => {
  const state = useTrackedState();
  const [attributes, setAttributes] = useState([]); // 2D array for all the attributes
  // this states what data will show up in the confirmation dialogue after a scan
  const [certData, setCertData] = useState({type: '0', attester: ''});
  const [selected, setSelected] = useState({holderID: '', creatorID: '', type: '', hash: ''});
  const [scannerVisible, setScannerVisible] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);

  const updateInterval = 500; // how many milliseconds between api calls
  const url = state.serverURL + '/attestation?type=attributes';

  const handleQRScan = (dataString: string) => {
    const data = JSON.parse(dataString);
    console.log(data);
    setCertData({type: data.type, attester: data.id});
    setDialogueVisible(true);
  };

  useFocusEffect(() => {
    const interval = setInterval(() => {
      getAttributes(url, setAttributes, state.jwt);
    }, updateInterval);

    return () => clearInterval(interval);
  });

  return (
    <View style={state.darkMode ? styles.dark : styles.light}>
      <View style={styles.header}>
        <Text style={state.darkMode ? styles.titleDark : styles.titleLight}>My Dashboard</Text>
        <Text style={state.darkMode ? styles.subtitleDark : styles.subtitleLight}>
          You can find your <B>Certificates</B> below.
        </Text>
      </View>
      <Button
        accessibilityStates
        color="white"
        style={{backgroundColor: 'dodgerblue'}}
        mode="outlined"
        onPress={() => setScannerVisible(true)}
      >
        ADD CERTIFICATE
      </Button>
      <SafeAreaView
        style={{
          flex: 1,
          minWidth: '100%',
          alignContent: 'center',
          alignSelf: 'center',
          marginVertical: 0.03 * height,
        }}
      >
        {attributes.length > 0 ? (
          <View>
            <Text style={state.darkMode ? styles.instructionsDark : styles.instructionsLight}>
              Click <B>Show Certificate</B> in order to generate a QR code and show it to
              the <B>Person</B> requesting your <B>Certificate</B>.
            </Text>
            <View>
              <FlatList // we use FlatList to provide list functionality
                style={{width: '95%', alignSelf: 'center'}}
                data={attributes}
                keyExtractor={(item, index) => item[0] + '' + item[1] + index} //
                renderItem={(
                    {item}, // we render every item in the certificates as a Certificateview
                ) => (
                  <CertificateView
                    certificate={{
                      creatorID: JSON.parse(JSON.stringify(item[3])),
                      holderID: state.ID,
                      type: JSON.parse(JSON.stringify(item[0])),
                      hash: JSON.stringify(item[1]),
                    }}
                    modalVisible={setVerificationVisible}
                    setSelected={setSelected}
                  />
                )}
              />
            </View>
          </View>
        ) : (
            <Text style={state.darkMode ? styles.instructionsDark : styles.instructionsLight}>
            You have no <B>Certificates</B> yet. {'\n'} Click <B>ADD CERTIFICATE</B> and
            scan the QR code provided by your <B>Doctor</B>.
            </Text>
          )}

        <CertificationDialogue
          type={certData.type}
          attester={certData.attester}
          visible={dialogueVisible}
          setVisible={setDialogueVisible}
        />
        <BasicQRModal
          data={JSON.stringify({
            holderID: selected.holderID,
            hash: selected.hash.replace(/['"]+/g, ''),
          })}
          visible={verificationVisible}
          setVisible={setVerificationVisible}
        />
        <QRScannerModal
          visible={scannerVisible}
          setVisible={setScannerVisible}
          onRead={handleQRScan}
        />
        <AllowVerificationDialogue />
      </SafeAreaView>
      <DrawerButton />
    </View>
  );
};

const {height} = Dimensions.get('window');

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
 */
const styles = StyleSheet.create({
  titleDark: {
    marginTop: 0.005 * height,
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#fff',
  },
  titleLight: {
    marginTop: 0.005 * height,
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#000',
  },
  dark: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  light: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  subtitleLight: {
    marginVertical: 0.005 * height,
    fontSize: 16,
    textAlign: 'center',
  },
  subtitleDark: {
    marginTop: 0.005 * height,
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 0.05 * height,
    padding: '1.2%',
  },
  instructionsLight: {
    fontSize: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 5,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  instructionsDark: {
    fontSize: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: 5,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});

export default Dashboard;
