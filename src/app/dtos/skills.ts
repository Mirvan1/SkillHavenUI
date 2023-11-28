export interface PaginatedRequest{
    page: number;
    pageSize: number;
    orderBy: boolean;
    orderByPropertname: string;
}


export interface getAllSkillerDto  extends PaginatedRequest{
    searchByName: string;

}

export enum Role
{
    Admin = 1,
    User = 2,
    Consultant = 3,
    Supervisor = 4
}


export interface ListSkillerDtos {
    totalCount: number;
    totalPages: number;
    data: SkillerDto[];
}

export interface SkillerDto  {
    role: Role | null;
    fullName: string;
    supervisorExpertise: string | null;
    supervisorDescription: string | null;
    email: string | null;
    profilePicture: string | null;
    experience: number | null;
    description: string | null;
    rating: number | null;
}