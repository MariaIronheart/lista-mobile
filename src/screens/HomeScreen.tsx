import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FAB, Paragraph, Title } from "react-native-paper";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';




const APP_KEY_STORAGE = "APP_KEY_MY_NOTES";

type HomeScreenProps = {
    navigation: any
}


const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

    const [ notes, setNotes ] = useState<string[]>([]);

    useEffect( () => {
        loadNotes();
    }, []);


    const loadNotes = async () => {
        try {
            const notasSalvas = await AsyncStorage.getItem(APP_KEY_STORAGE);
            if (notasSalvas !== null ){
                setNotes(JSON.parse(notasSalvas));
            }
        } catch (err) {
            console.error("Erro ao ler notas:", err);
        }
    }

    const handleAddNote = async (note: string) => {
        const newNotes = [ ...notes, note];
        setNotes(newNotes);
        const notesStringify = JSON.stringify(newNotes);
        try {
            await AsyncStorage.setItem(APP_KEY_STORAGE, notesStringify);
            navigation.goBack();
        } catch(err){
            console.error("Erro ao salvar nota:", err);            
        }
    }

    const handleRemoveNote = async (index: number) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
        const notesStringify = JSON.stringify(newNotes);
        try {
            await AsyncStorage.setItem(APP_KEY_STORAGE, notesStringify);
        } catch (err) {
            console.error("Erro ao remover nota:", err);
        }
    }

    const handleEditNote = async (note: string) => {
            const EditedNotes = [ ...notes, note];
            setNotes(EditedNotes);
            const notesStringify = JSON.stringify(EditedNotes);
            try {
                await AsyncStorage.setItem(APP_KEY_STORAGE, notesStringify);
                navigation.goBack();
            } catch(err){
                console.error("Erro ao editar nota:", err);            
            }
        
    };
    

    return(
        <View style={styles.container}>
            <ScrollView>
                {notes.map((note, index) => (
                    <Card key={`card-key-${index}`} style={styles.card}>
                        <Card.Content>
                            <Title>{`Nota ${index+1}`}</Title>
                            <Paragraph>{note}</Paragraph>
                            <FAB
                                style={styles.fabEdit}
                                icon={"content-save-edit"}
                                onPress={() => navigation.navigate('EditNote', { onEditNote: handleEditNote })}
                            />
                            <FAB
                                style={styles.fabRemove}
                                icon={"delete-forever"}
                                onPress={() => handleRemoveNote(index)}
                            />
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
            <FAB
                style={styles.fab}
                icon={"plus"}
                onPress={() => navigation.navigate('AddNote', { onAddNote: handleAddNote })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    },
    card: {
        marginBottom: 16
    },
    fabRemove: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    fabEdit: {
        position: 'absolute',
        margin: 16,
        right: 70,
        bottom: 0
    }
})

export default HomeScreen;
