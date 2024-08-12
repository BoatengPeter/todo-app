export type TodoCardProps  = {
    id?:number;
    status: boolean ;
    title: string;
    description: string | null;
    createdAt:  Date ;
    subTasks?: never[] | null;
    // children?: React.ReactNode;
} 

export type SubTaskProps  ={
    id?:number;
    title: string;
    status: boolean;
    // createdAt: string | null;
    description: string;
}