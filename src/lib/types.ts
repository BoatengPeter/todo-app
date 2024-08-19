
export type TodoCardProps  = {
    id?:number;
    status: boolean ;
    title: string;
    description: string | null;
    createdAt:  Date ;
    subTasks?: SubTaskProps[];
} 

export type SubTaskProps  ={
    id?:number;
    title: string;
    status: boolean;
    createdAt: Date;
    description: string | null;
}
