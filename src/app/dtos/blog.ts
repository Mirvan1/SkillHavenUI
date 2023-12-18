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
    photoPath:string;
    vote:number;
}


export interface UpdateBlogDto {
    id: number;
    title: string;
    content: string;
    isPublished: boolean;
    updateDate?: Date;
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
    content: string;
    publishDate?: Date;
    isPublished: boolean;
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
}

export interface ListBloCommentsDtos {
    totalCount: number;
    totalPages: number;
    data: BlogCommentsDto[];
}


export enum BlogAddOrUpdate
{
    Add=1,
    Update=2
}