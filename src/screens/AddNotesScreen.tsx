import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../types/AppType";
import { RouteProp } from "@react-navigation/native";

type AddNoteScreenRouteProp = 
    RouteProp<RootStackParamList, 'AddNote'>;

type AddNoteScreenProps = {
    route: AddNoteScreenRouteProp
}

const AddNotesScreen: React.FC<AddNoteScreenProps> = ({route}) => {
    //debugger;
    const { onAddNote } = route.params;

    const [ note, setNote ] = useState<string>('');

    const [ title, setTitle ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');

    const handleChangeNote = () => {
        if (note.trim() !== ''){
            onAddNote(note)   
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <TextInput 
                style={styles.input}
                placeholder="Digite o título da nota..."
                value={title}
                onChangeText={setTitle}
            />
            <TextInput 
                style={styles.input}
                placeholder="Digite a descrição da nota..."
                value={description}
                onChangeText={setDescription}
            />
            </View>
            
            <Button mode="contained" onPress={handleChangeNote}>
                Adicionar Nota
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    },
    input: {
        marginBottom: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        minHeight: 100
    },
    box: {
        height: 250,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'purple',
    }
})

export default AddNotesScreen;