

// api/v1/users --> GET
// api/v1/users --> POST
// api/v1/users/:id --> GET, PUT, PATCH,DELETE

import { Request, Response, Router } from "express";
import { UserService } from "../services/userService";
import { UserInterface } from "../interfaces/UserInterface";
import { CheckCredentialsMiddelware } from "../middelware/checkCredentialsMiddelware";

export const usersController = Router()

usersController.get("", async(req: Request, res: Response) =>{
    const userService = new UserService()
    //return XX: UserInterface[]
    return res.send({data: userService.getAll()})
})

usersController.get("/:uuid",CheckCredentialsMiddelware, async(req: Request<{uuid: string}>, res: Response) => {
    const userService = new UserService();
    console.log(req.params)
    return res.send({data: userService.getById(req.params.uuid)})

})

usersController.post("", (req: Request<UserInterface>, res: Response) => {
    const userService = new UserService();
    const userInfo = userService.createUser(req.body)
    if (Object.keys(userInfo).includes("error"))
        return res.status(400).send(userInfo)
    else{
        return res.status(201).send(userInfo)
    }
})

usersController.post("/login", (req: Request<{username: string, password: string}>, res: Response) => {
    const userService = new UserService();
    const userInfo = userService.checkCredentials(req.body.username, req.body.password)
    if (userInfo != "")
        return res.status(200).send(userInfo)
    return res.status(404).send({"Error": "Usuario no encontrado"})
})