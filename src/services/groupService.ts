import { GroupInterface } from "../interfaces/groupInterface";
import groups from "../data/groups.json";
import fs from "fs";
import path from "path";
import { v4 as uuid } from 'uuid';

export class GroupService {
  getAll(): GroupInterface[] {
    return groups;
  }
  createGroup(data: Omit<GroupInterface,"id">): { error: string } | { message: string } {
    let new_group: GroupInterface = {
      ...data,
      id: uuid()
    }
    let jsonContent = groups;

    jsonContent.push(new_group);

    // Usa path.resolve para obtener la ruta absoluta
    const filePath = path.resolve(__dirname, "../data/groups.json");

    // Escribir el archivo
    fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), (err) => {
      if (err) {
        console.error(err); // Agrega logging para ver el error
        return { error: "Error al escribir en el archivo" };
      }
    });

    return { message: "Registro agregado correctamente" };
  }
}
