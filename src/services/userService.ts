import { UserInterface } from "../interfaces/UserInterface";
import users from "../data/users.json";
import groups from "../data/groups.json";
import { GroupInterface } from "../interfaces/groupInterface";


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
}