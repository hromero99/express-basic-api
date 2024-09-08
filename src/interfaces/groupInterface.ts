

export interface GroupInterface{
    id: string,
    name: string,
    date_start: string,
    members: {
        id: string
    }[]
}