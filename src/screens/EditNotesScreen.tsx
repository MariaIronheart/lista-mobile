import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../types/AppType";
import { RouteProp } from "@react-navigation/native";

type EditNoteScreenRouteProp = 
    RouteProp<RootStackParamList, 'EditNote'>;

type EditNoteScreenProps = {
    route: EditNoteScreenRouteProp
}

const EditNoteScreen: React.FC<EditNoteScreenProps> = ({ route }) => {
    debugger;
    const { onEditNote } = route.params;
    const [EditedNote, setEditedNote] = useState<string>('');

    const handleEditNote = async () => {
        if (EditedNote.trim() !== ''){
            onEditNote(EditedNote)   
        }
    };

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Digite a edição..."
                multiline
                value={EditedNote}
                onChangeText={setEditedNote}
            />
            <Button mode="contained" onPress={handleEditNote}>
                Editar Nota
            </Button>
        </View>
    );
};

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
    }
});

export default EditNoteScreen;
