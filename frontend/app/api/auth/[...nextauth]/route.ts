import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const internalUrl = "http://keycloak:8080/realms/demo";
const externalUrl = "http://localhost:8081/realms/demo";

async function refreshAccessToken(token: any) {
  try {
    const url = `${internalUrl}/protocol/openid-connect/token`;
    const response = await fetch(url, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: externalUrl,
      wellKnown: `${internalUrl}/.well-known/openid-configuration`,
      authorization: {
        url: `${externalUrl}/protocol/openid-connect/auth`,
        params: { scope: "openid profile email offline_access" }
      },
      token: `${internalUrl}/protocol/openid-connect/token`,
      userinfo: `${internalUrl}/protocol/openid-connect/userinfo`,
      jwks_endpoint: `${internalUrl}/protocol/openid-connect/certs`,
    }),
  ],
  events: {
    async signOut({ token }) {
      if (token.accessToken) {
        const logoutUrl = `${externalUrl}/protocol/openid-connect/logout?post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`;
        // 這裡通常透過重定向處理，但 API Route 環境下我們返回一個指示
        console.log("Redirecting to Keycloak logout:", logoutUrl);
      }
    }
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_in! * 1000),
          refreshToken: account.refresh_token,
          idToken: account.id_token, // 儲存 ID Token 用於登出
          user,
        };
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.error = token.error as string | undefined;
      return session;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
