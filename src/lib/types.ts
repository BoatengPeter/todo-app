export type TodoCardProps  = {
    id?:number;
    status: boolean | null;
    title: string;
    description: string | null;
    // createdAt:  string; 
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