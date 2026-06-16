import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const internalUrl = "http://keycloak:8080/realms/demo";
const externalUrl = "http://localhost:8081/realms/demo";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: externalUrl,
      wellKnown: `${internalUrl}/.well-known/openid-configuration`,
      authorization: {
        url: `${externalUrl}/protocol/openid-connect/auth`,
        params: { scope: "openid profile email" }
      },
      token: `${internalUrl}/protocol/openid-connect/token`,
      userinfo: `${internalUrl}/protocol/openid-connect/userinfo`,
      jwks_endpoint: `${internalUrl}/protocol/openid-connect/certs`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
