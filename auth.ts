import { verifyCredentials } from '@/utils/auth';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
}

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (typeof credentials?.email !== 'string' || typeof credentials?.password !== 'string') {
          throw new InvalidLoginError()
        }

        return await verifyCredentials(credentials.email, credentials.password);
      },
    }),
  ],
});
