


export class CreateAccountInput{
    username: string;
    password: string;
}

export class CreateAccountOutput{
    ok: boolean;
    error?: string; 
}