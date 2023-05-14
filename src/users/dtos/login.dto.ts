

export class LoginInput {
    username: string;
    password: string;
}

export class LoginOutput {
    ok: boolean;
    token?: string;
    error?: string;
}