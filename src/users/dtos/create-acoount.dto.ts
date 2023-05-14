


export class CreateAccountInput{
    username: string;
    password: string;
    email: string;
}

export class CreateAccountOutput{
    ok: boolean;
    error?: string; 
}