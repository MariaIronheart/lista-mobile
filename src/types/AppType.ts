

type RootStackParamList = {
    Home: undefined,
    AddNote: {
        onAddNote: (note:string) => void,
    };
    EditNote : {
        onEditNote: (note:string) => void,
    }
}

export {
    RootStackParamList
}

