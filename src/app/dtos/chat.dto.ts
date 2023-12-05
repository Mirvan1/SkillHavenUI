import { PaginatedRequest } from "./skills";
import { UserDto } from "./user.dto";

export interface GetMessagesByUser extends PaginatedRequest {
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
    fullName:string;
}

export interface GetOnlineUsersDto {
    id: number;
    userId: number;
    lastSeen: string;
    status: string | null;
    profilePicture: string | null;
}


export interface ListChatMessagesDtos {
    totalCount: number;
    totalPages: number;
    data: GetMessagesByUserResponse[];
}

export interface GetMessagesByUserResponse {
 messageId  :number;
 senderChatId  :number;
 senderUserId  :number;
 senderUsername:string;
 receiverChatId  :number;
 receiverUserId  :number;
 receiverUsername:string;
 content  :string;
 timestamp  :Date;
 messageType:string ;
 seenStatus :string;

 senderProfilePicture :string

receiverProfilePicture :string
 senderStatus:string;
    
 receiverStatus :string
}