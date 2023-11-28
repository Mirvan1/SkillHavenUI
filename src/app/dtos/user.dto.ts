export interface UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profilePicture: string;
}


export interface RegisterUserDto{
    email: string;
    password: string;
    role: Role;
    firstName: string;
    lastName: string;
    profilePicture: string;
    consultantInfo: ConsultantRegistrationInfo;
    supervisorInfo: SupervisorRegistrationInfo;
}

export interface ConsultantRegistrationInfo {
    experience: number;
    description: string;
}

export interface SupervisorRegistrationInfo {
    expertise: string;
    description: string;
}

export enum Role {
    Admin = 1,
    User = 2,
    Consultant = 3,
    Supervisor = 4
}



export interface ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}