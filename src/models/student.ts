export interface Student {
    id?: string;
    name: string;
    age: number;
    mark: number;
    gender: 'Male' | 'Female';
    city: string;

    createdAt?: number;
    updatedAt?: number;
}