import { PaginatedRequest } from "./skills";
import { Role } from "./user.dto";

export interface GetBlogDto {
    blogId: number;
    title: string;
    content: string;
    userId: number;
    publishDate: string;
    updateDate: string;
    isPublished: boolean;
    fullName: string;
    role: Role | null;
    email: string;
    photoPath?:string;
    vote?:number;
    nOfReading?:number;
    blogComments?:number;
    blogTopicId:number;
    blogTopicName:string;
    userPhotoPath:string;
}

export interface BlogPaginatedRequest extends PaginatedRequest{
    blogTopicId?:number;
}

export interface UpdateBlogDto {
    id: number;
    title: string;
    photo?:string;
    content: string;
    isPublished: boolean;
    updateDate?: Date;
    blogTopicId:number;
}


export interface CreateBlogCommentDto {
    blogId: number;
    commentTitle: string;
    commentContent: string;
    publishDate: Date;
    isPublished: boolean;
}
export interface ListBlogDtos {
    totalCount: number;
    totalPages: number;
    data: GetBlogDto[];
}


export interface CreateBlogDto{
    title: string;
    photo?:string;
    content: string;
    publishDate?: Date;
    isPublished: boolean;
    blogTopicId:number;
}

export interface VoteBlogDto {
    blogId: number;
    isIncreased: boolean;
}

export interface GetBlogCommentsDto extends PaginatedRequest{
    blogId:number
}


export interface BlogCommentsDto {
    blogCommentsId: number;
    blogId: number;
    userId: number;
    commentTitle: string;
    commentContent: string;
    publishDate: string;
    isPublished: boolean;
    fullName: string;
    blogName: string;
    userPhoto:string;
}

export interface ListBloCommentsDtos {
    totalCount: number;
    totalPages: number;
    data: BlogCommentsDto[];
}

export interface ListGetBlogTopicDto{
    totalCount: number;
    totalPages: number;
    data: GetBlogTopicDto[];
}

export interface GetBlogTopicDto{
    topicName:string;
    isActive:boolean;
    blogTopicId:number;
}

export enum BlogAddOrUpdate
{
    Add=1,
    Update=2
}