import React, { useState } from 'react'
import { View, Button, Text, StyleSheet, Modal} from 'react-native'
import { TouchableOpacity} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { PostVerification } from '../network/NetworkCalls';
import { useTrackedState, State } from '../Store';

interface QRModalProps {
  visible:boolean
  setVisible:Function
  onRead:Function
}

const QRModal: React.FC<QRModalProps> = ({visible,setVisible, onRead}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(false)
                }}
            onDismiss= {() => {
                setVisible(false)
                }}  
                >

            <QRCodeScanner
                    onRead={(e) => onRead(e.data)}
                    topContent={
                      <Text style={styles.centerText}>
                        Go to{' '}
                        <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                        your computer and scan the QR code.
                      </Text>
                    }
                    bottomContent={
                      <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                      </TouchableOpacity>
                    }
                  />           
        </Modal>
        
    )
}

const modalStyle = {
    borderRadius:10,
    margin:10,
    backgroundColor:'green',
    justifyContent: "center",
    aligntItems:"center",
    flex:1
}

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });

export default QRModal

