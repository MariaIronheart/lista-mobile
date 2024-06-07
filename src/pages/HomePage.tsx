import React, {useState} from "react";
import ListRepository, {Lista} from "../repository/ListRepository";
import { Button, Text, View } from "react-native";

const repository = new ListRepository();

const HomePage: React.FC = () => {
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
        <View>
            <Button onPress={criarLista} title="Criar"/>
            <Button onPress={listarLista} title="Listar"/>
            {
                list.map (lista => (
                    <View key={`lista-item${lista.id}`}>
                        <Text>{`${lista.type} -
                                ${lista.description}`}</Text>

                    </View>
                )) 
            }
            
        </View>
    )

}

export default HomePage;

