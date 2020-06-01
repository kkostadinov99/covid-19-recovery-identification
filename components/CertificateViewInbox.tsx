import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Divider } from 'react-native-paper'
import { Certificate, useTrackedState } from '../Store'
import DeclineButton from '../components/DeclineButton';
import AcceptButton from '../components/AcceptButton';
import CertificateView from './CertificateView';

interface InboxCertificateProps {
    listID : number,
    certificate: Certificate,
    deleteCert: Function,
    onClick: Function
}

const checkUserIsOwner = (userId: string, id: string) => {
    return (userId == id ? "You" : id)
}

const CertificateViewInbox: React.FC<InboxCertificateProps> = ({ listID, certificate, deleteCert}: InboxCertificateProps) => {
    const state = useTrackedState()
    return (
        <View style={certificateStyle}>
            <CertificateView certificate = {certificate}/>
            <View style={styles.buttonPair}>
                    <AcceptButton
                     attester={certificate.creatorID}
                     deleteCert={deleteCert}
                     listID={listID}
                     type={certificate.type}
                     postType={0}
                    />
                    <Text>{"\r"}</Text>
                    <DeclineButton
                     listID={listID} 
                     deleteCert={deleteCert} // we pass the deleteCert function from inboxscreen to the declinebutton
                     />  
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonPair: {
        left: 35,
        flexDirection: "row",
        top: 20
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    labelDivision: {
        borderWidth: 2,
        borderRadius: 1,
        borderColor: 'gray',
        padding: 3,
        paddingVertical: 0
    },
});

const certificateStyle = {
    margin: 20,
    innerHeight: 10,
    font: 'Open Sans',
}

export default CertificateViewInbox