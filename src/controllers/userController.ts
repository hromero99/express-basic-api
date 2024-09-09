

// api/v1/users --> GET
// api/v1/users --> POST
// api/v1/users/:id --> GET, PUT, PATCH,DELETE

import { Request, Response, Router } from "express";
import { UserService } from "../services/userService";

export const usersController = Router()

usersController.get("", async(req: Request, res: Response) =>{
    const userService = new UserService()
    //return XX: UserInterface[]
    return res.send({data: userService.getAll()})
})

usersController.get("/:uuid",async(req: Request<{uuid: string}>, res: Response) => {
    const userService = new UserService();
    console.log(req.params)
    return res.send({data: userService.getById(req.params.uuid)})

})