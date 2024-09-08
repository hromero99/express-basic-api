import { Request, Response, Router } from 'express';
import { GroupService } from '../services/groupService';
import { GroupInterface } from '../interfaces/groupInterface';

export const groupsController = Router();

groupsController.get("",async (req: Request,res:Response) => {
    const groupService = new GroupService()
    return res.status(200).send({data: groupService.getAll()})
})

groupsController.post("", async(req: Request<Partial<GroupInterface>>, res: Response) => {
    const groupService = new GroupService()
    const resultCreateNewGroup = groupService.createGroup(req.body)
    if (Object.keys(resultCreateNewGroup).includes("error")){
        res.status(400).send({data: "Estructura de datos incorrecta"})
    }
    else {
        res.status(201).send({data: "Grupo creado correctamente"})
    }
})