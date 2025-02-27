import CustomListItem from "./CustomList";

export class IListCollection {
    listId!: string;
    userId!: string;
    listName!: string;
    votes!:number
    created_at!: Date;
    customItems!:Array<CustomListItem>

}