import { executeTransation } from "../database/SQLiteDatabase";
import { StringBuilderUtils } from "../utils/StringBilderUtils";
import * as SQLite from 'expo-sqlite';


export type Lista = {
    id?: number;
    type: string;
    description: string;
}



export class ListRepository {
    
    private tableName: string = "lista"

    constructor() {
        this.up();
    }

    private async up() : Promise<void> {
        const sb: StringBuilderUtils = new StringBuilderUtils();
        sb.append(`CREATE TABLE IF NOT EXISTS ${this.tableName} (`);
        sb.append("id INTEGER PRIMARY KEY AUTOINCREMENT, ");
        sb.append("type TEXT NOT NULL, ");
        sb.append("description TEXT NOT NULL );");
        const sql: string = sb.toString();
        await executeTransation(sql);

    }

    public async down(): Promise<void> {
        await executeTransation(`DROP TABLE ${this.tableName}`);
    }

    public async create(lista: Lista): Promise<number | undefined> {
        const sql: string = `INSERT INTO ${this.tableName} (type, description) VALUES (?,?)`;
        const args = [
            lista.type,
            lista.description
        ];
        const resultado = await executeTransation(sql,args);
        return resultado.insertId;
    }
    
    public async listarListas(): Promise<Lista[]> {
        const lista: Lista[] = [];

        const sql: string = `SELECT * FROM ${this.tableName}`;
        console.log("SQL:", sql);
        const consulta = await executeTransation(sql);

        for(let i = 0; i < consulta.rows.length; i++){
            const tarefa = consulta.rows.item(i);
            console.log("LISTA INTERNA:",tarefa);
            lista.push({
                id: tarefa.id,
                type: tarefa.type,
                description: tarefa.description
            });
        }
        return lista;
    }

}

export default ListRepository;