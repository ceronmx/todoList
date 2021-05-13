export interface TaskResponse {
    error:    boolean;
    response: Task[];
    status:   number;
}

export interface Task {
    completed:   boolean;
    _id:         string;
    description: string;
    owner:       string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}
