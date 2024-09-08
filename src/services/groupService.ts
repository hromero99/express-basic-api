import { GroupInterface } from "../interfaces/groupInterface";
import groups from "../data/groups.json";
import fs from "fs";
import path from "path";

export class GroupService {
  getAll(): GroupInterface[] {
    return groups;
  }
  createGroup(data: GroupInterface): { error: string } | { message: string } {
    let jsonContent = groups;
    jsonContent.push(data);

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
