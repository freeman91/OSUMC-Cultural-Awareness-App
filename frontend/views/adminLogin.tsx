import * as React from 'react';
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';


const styles = StyleSheet.create({
    card: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        padding: 10,
        fontSize: 18,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
});

export function adminLogin({ route, navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const bgImage = {
        uri:
          'https://images.pexels.com/photos/3137064/pexels-photo-3137064.jpeg',
      };

    const handleLogin = () => {
        console.log('email: ', email)
        console.log('password: ', password)
    }

    console.log('route: ', route);

    return (
        <ImageBackground source={bgImage} imageStyle={{resizeMode: 'stretch'}} style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
            
            <Card style={styles.card}>
                <TextInput
                    style={styles.container}
                    mode="outlined"
                    label="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.container}
                    mode="outlined"
                    label="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                { route.name == "Register" ?
                    <TextInput
                        style={styles.container}
                        mode="outlined"
                        label="password confirmation"
                        value={passwordConfirmation}
                        onChangeText={text => setPasswordConfirmation(text)}
                    /> : <></> }
                <Button icon="login" mode="contained" onPress={() => handleLogin()}>
                    submit
                </Button>
            </Card>
          
        </ScrollView>
        </ImageBackground>
    );
}

