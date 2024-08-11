import { Client, ID, Account } from "appwrite";

export class appwriteAuthentication {
    client: Client = new Client();
    account: Account;

    constructor() {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
            .setProject(import.meta.env.VITE_PRODUCT_ID);
        this.account = new Account(this.client);
    }

    async createAccount({
        email,
        password,
        name,
    }: {
        email: string;
        password: string;
        name: string;
    }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (user) {
                return this.userLogin({ email, password });
            }
            return user;
        } catch (error: unknown) {
            console.error("Appwrite error");
            throw error;
        }
    }

    async userLogin({ email, password }: { email: string; password: string }) {
        const user = await this.account.createEmailPasswordSession(
            email,
            password
        );
        return user;
    }

    async getCurrentUser() {
        const user = await this.account.get();
        return user;
    }

    async userLogout() {
        return await this.account.deleteSessions();
    }
}
const authSer = new appwriteAuthentication();
export default authSer;
