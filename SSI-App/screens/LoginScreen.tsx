import React from 'react'
import { StyleSheet, Text, Image, View, TextInput } from 'react-native';


const LoginScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <img  src={require("./logo.png")} /> 
            <Text style={{fontWeight: "bold", color:"#1d5" } }> sign in as patient</Text>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Password" placeholder="Password" />
                </label>
                <br/>
            </form>
            <input type="submit" value="login"/>
                <Text style={{fontWeight: "bold", color:"#1d5"}}><br/> sign in as health expert</Text>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Password" placeholder="Password" />
                </label>
                <br/>
            </form>
            <input type="submit" value="login"/>
            
            {
            //How do i link to the register screen???
            }
            <Text style={{fontWeight: "bold", color:"#1d5"}}><br/>No account? <a href="RegisterScreen.tsx">Make one</a>!</Text>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
         
        backgroundImage: "url(" + require("./background.jpeg") + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        
        alignItems: 'center',
        padding: 24,
        justifyContent: 'center',
        
    }
});



export default LoginScreen