import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./src/types/AppType";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddNotesScreen from "./src/screens/AddNotesScreen";
import EditNoteScreen from "./src/screens/EditNotesScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{title: 'Lista de Notas'}}
          />
          <Stack.Screen
              name="AddNote"
              component={AddNotesScreen}
              options={{title: 'Adicionar Nota'}}
              initialParams={{ onAddNote: () => {} }}
          />
          <Stack.Screen
            name="EditNote"
            component={EditNoteScreen}
            options={{title: 'Editar Nota'}}
            initialParams={{ onEditNote: () => {} }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>    
  );
}