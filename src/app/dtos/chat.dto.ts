import { PaginatedRequest } from "./skills";

export interface GetMessagesByUserQuery extends PaginatedRequest {
    receiverUserId: number;
}

export interface ListChatUsersDtos {
    totalCount: number;
    totalPages: number;
    data: GetChatUserDto[];
}


export interface ListOnlineUsersDtos {
    totalCount: number;
    totalPages: number;
    data: GetOnlineUsersDto[];
}


export interface GetChatUserDto {
    id: number;
    userId: number;
    lastSeen: string;
    status: string | null;
    profilePicture: string | null;
    connectionId: string | null;
    connectedTime: string | null;
}

export interface GetOnlineUsersDto {
    id: number;
    userId: number;
    lastSeen: string;
    status: string | null;
    profilePicture: string | null;
}