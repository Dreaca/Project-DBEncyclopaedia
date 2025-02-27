import CustomItem from "./CustomItem";

export default class CustomList {
    listId!:string
    userId!:string
    listName!:string
    votes!:number
    customItems!:Array<CustomItem>
}