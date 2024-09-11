import { UserInterface } from "../interfaces/UserInterface";
import users from "../data/users.json";
import groups from "../data/groups.json";
import { GroupInterface } from "../interfaces/groupInterface";
import { v4 as uuid } from 'uuid';
import fs from "fs";
import path from "path";
import { createHash } from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
const SECRET_KEY =  process.env.SECRET_KEY || "asd"

export class UserService{

    getAll(): UserInterface[]{
        return users
    }

    getById(uuid:string): {user: UserInterface, group: GroupInterface} | null{
 
        const user = users.filter((userData) => userData.id === uuid )
        if (user.length > 0){
            const group_info = groups.filter((groupData: GroupInterface) => {
                const userInGroup = groupData.members.filter((groupMember) => groupMember.id === uuid)
                return userInGroup.length >= 1
            })
            return {
                user: user[0],
                group: group_info[0]
            }
        }
        return null
    }

    createUser(data: Omit<UserInterface,"id">): { error: string } | { message: string} {
        let new_user: UserInterface = {
          ...data,
          id: uuid(),
          password: createHash('sha256').update(data.password!).digest('hex')
        }

        let jsonContent = users;
    
        jsonContent.push(new_user);
    
        // Usa path.resolve para obtener la ruta absoluta
        const filePath = path.resolve(__dirname, "../data/users.json");
    
        // Escribir el archivo
        fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), (err) => {
          if (err) {
            console.error(err); // Agrega logging para ver el error
            return { error: "Error al escribir en el archivo" };
          }
        });
        const token = jwt.sign({ username: new_user.email }, SECRET_KEY, { expiresIn: '1h' });

        return { message: token};
    }

    checkCredentials(username: string,password: string): string {
        let  token =""
        const passwordCrypted = createHash('sha256').update(password!).digest('hex')
        const result = users.filter((user: UserInterface) => user.email == username && user.password == passwordCrypted)
        if (result.length > 0)
            token = jwt.sign({ username: result[0].email }, SECRET_KEY, { expiresIn: '1h' });
        return token
    }
}
