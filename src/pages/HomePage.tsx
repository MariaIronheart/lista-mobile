import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FAB, Paragraph, Title } from "react-native-paper";
import { Button, Text } from "react-native";
import ListRepository, {Lista} from "../repository/ListRepository";


const APP_KEY_STORAGE = "APP_KEY_MY_NOTES";
const repository = new ListRepository();

type HomeScreenProps = {
    navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

    const [list, setList] = useState<Lista[]>([]);

    const criarLista = async () => {
        const listaId = await repository.create(
            {
                type: 'compras',
                description:'dois ovos'
            }
        );
        console.log(listaId);
    }

    const listarLista = async() => {
        const list: Lista[] = await repository.listarListas();
        setList(list);
        console.log(list);
    }

    return(

        <View style={styles.container}>
            {
                list.map (lista => (
                    <View key={`lista-item${lista.id}`}>
                        <Text style={styles.texto}>{`${lista.type} -
                                ${lista.description}`}</Text>

                    </View>
                )) 
            }
            <Button onPress={listarLista} title="Listar"/>
             <FAB
                style={styles.fab}
                icon={"plus"}
                onPress={criarLista}
                />
            <FAB
                style={styles.fablist}
                icon={"equal"}
                onPress={listarLista}
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    fablist: {
        position:'absolute',
        margin:16,
        right: 70,
        bottom:0
    },
    texto: {
        backgroundColor: 'blue',
    }
})

export default HomeScreen;