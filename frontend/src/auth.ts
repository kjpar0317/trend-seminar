// import type { NextAuthConfig } from "next-auth"

import NextAuth from "next-auth"
// import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
// import Auth0 from "next-auth/providers/auth0"
// import Authentik from "next-auth/providers/authentik"
// import AzureAD from "next-auth/providers/azure-ad"
// import AzureB2C from "next-auth/providers/azure-ad-b2c"
// import Battlenet from "next-auth/providers/battlenet"
// import Box from "next-auth/providers/box"
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
// import Bungie from "next-auth/providers/bungie"
// import Cognito from "next-auth/providers/cognito"
// import Coinbase from "next-auth/providers/coinbase"
// import Discord from "next-auth/providers/discord"
// import Dropbox from "next-auth/providers/dropbox"
// import DuendeIDS6 from "next-auth/providers/duende-identity-server6"
// import Eveonline from "next-auth/providers/eveonline"
// import Facebook from "next-auth/providers/facebook"
// import Faceit from "next-auth/providers/faceit"
// import FortyTwoSchool from "next-auth/providers/42-school"
// import Foursquare from "next-auth/providers/foursquare"
// import Freshbooks from "next-auth/providers/freshbooks"
// import Fusionauth from "next-auth/providers/fusionauth"
// import GitHub from "next-auth/providers/github"
// import Gitlab from "next-auth/providers/gitlab"
// import Google from "next-auth/providers/google"
// import Hubspot from "next-auth/providers/hubspot"
// import Instagram from "next-auth/providers/instagram"
// import Kakao from "next-auth/providers/kakao"
// import Keycloak from "next-auth/providers/keycloak"
// import Line from "next-auth/providers/line"
// import LinkedIn from "next-auth/providers/linkedin"
// import Mailchimp from "next-auth/providers/mailchimp"
// import Mailru from "next-auth/providers/mailru"
// import Medium from "next-auth/providers/medium"
// import Naver from "next-auth/providers/naver"
// import Netlify from "next-auth/providers/netlify"
// import Okta from "next-auth/providers/okta"
// import Onelogin from "next-auth/providers/onelogin"
// import Osso from "next-auth/providers/osso"
// import Osu from "next-auth/providers/osu"
// import Passage from "next-auth/providers/passage"
// import Patreon from "next-auth/providers/patreon"
// import Pinterest from "next-auth/providers/pinterest"
// import Pipedrive from "next-auth/providers/pipedrive"
// import Reddit from "next-auth/providers/reddit"
// import Salesforce from "next-auth/providers/salesforce"
// import Slack from "next-auth/providers/slack"
// import Spotify from "next-auth/providers/spotify"
// import Strava from "next-auth/providers/strava"
// import Todoist from "next-auth/providers/todoist"
// import Trakt from "next-auth/providers/trakt"
// import Twitch from "next-auth/providers/twitch"
// import Twitter from "next-auth/providers/twitter"
// import UnitedEffects from "next-auth/providers/united-effects"
// import Vk from "next-auth/providers/vk"
// import Wikimedia from "next-auth/providers/wikimedia"
// import Wordpress from "next-auth/providers/wordpress"
// import WorkOS from "next-auth/providers/workos"
// import Yandex from "next-auth/providers/yandex"
// import Zitadel from "next-auth/providers/zitadel"
// import Zoho from "next-auth/providers/zoho"
// import Zoom from "next-auth/providers/zoom"
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    // Apple,
    // Atlassian,
    // Auth0,
    // Authentik,
    // AzureAD,
    // AzureB2C,
    // Battlenet,
    // Box,
    // BoxyHQSAML,
    // Bungie,
    // Cognito,
    // Coinbase,
    // Discord,
    // Dropbox,
    // DuendeIDS6,
    // Eveonline,
    // Facebook,
    // Faceit,
    // FortyTwoSchool,
    // Foursquare,
    // Freshbooks,
    // Fusionauth,
    // GitHub,
    // Gitlab,
    // Google,
    // Hubspot,
    // Instagram,
    // Kakao,
    // Keycloak,
    // Line,
    // LinkedIn,
    // Mailchimp,
    // Mailru,
    // Medium,
    // Naver,
    // Netlify,
    // Okta,
    // Onelogin,
    // Osso,
    // Osu,
    // Passage,
    // Patreon,
    // Pinterest,
    // Pipedrive,
    // Reddit,
    // Salesforce,
    // Slack,
    // Spotify,
    // Strava,
    // Todoist,
    // Trakt,
    // Twitch,
    // Twitter,
    // UnitedEffects,
    // Vk,
    // Wikimedia,
    // Wordpress,
    // WorkOS,
    // Yandex,
    // Zitadel,
    // Zoho,
    // Zoom,
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소 입력 요망",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        console.log("authorize");

        const res = await fetch(`http://www.omdbapi.com/?s=&apikey=da979bab`);

        const fakeData = {
          user: { ...credentials },
          token: "yJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjbXAtc2VydmljZS1hdXRoIiwic3ViIjoic3VwZXJhZG1pbiIsImF1ZCI6ImNtcC1jbGllbnQtZnJvbnRlbmQiLCJleHAiOjE3MzkzMzc3NTUsImlhdCI6MTcwNzgwMTc1NSwiaW5mb3MiOnsiZW50TmFtZSI6IuuMgOq1rOq0keyXreyLnCIsInVuaXROYW1lIjoi7KCV67O07ZmU67aA7IScIiwiaXAiOiIxMjcuMC4wLjEiLCJjb250cmFjdCI6IjAxMC0xMjM0LTk5OTkiLCJhY3RpdmUiOiJsb2NhbCIsImFkbWluIjp0cnVlLCJpc1NTT0xvZ2luIjpmYWxzZSwibG9naW5Vc2VyTmFtZSI6Iuq0gOumrOyekCIsImlzT1NNYW5hZ2VyIjp0cnVlLCJsb2dpblRpbWUiOjE3MDc4MDE2ODMwMDAsImVudENvZGUiOiJEQUUiLCJ1bml0Q29kZSI6IjAwMiIsImVtYWlsIjoiYWJjQGlubm9ncmlkLmNvbSIsInVzZXJuYW1lIjoic3VwZXJhZG1pbiJ9fQ.pS2QIGU8roPtXHjGEeIr4z_Ir6euVqMYNz6OBJ8TsjViqzR406DEqZKvNI0a9XQzLXwKrJDJS73uT2fe-IfEWg"
        }

        return fakeData;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } } : any) {
      console.log('authorized');
      // 유저 인증 확인
      const isLoggedIn = !!auth?.user;
      // 보호하고 싶은 경로 설정
      // 여기서는 /login 경로를 제외한 모든 경로가 보호 되었다
      const isOnProtected = !(nextUrl.pathname.startsWith('/login'));

      if (isOnProtected) {
        if(nextUrl.pathname === '/') return Response.redirect(new URL('/dashboard', nextUrl));
        if (isLoggedIn) return true;
        return false; // '/login' 경로로 강제이동
      } else if (isLoggedIn) {
        // 홈페이지로 이동
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      console.log("asdfdafa");
      return true;
    },
    async session(session: any) {
      console.log("async session");
      console.log(session);

      // // Send properties to the client, like an access_token and user id from a provider.
      // if(session) {
      //   session.token = token?.accessToken as string; // 전달받은 token 객체에서 토큰 값을 다시 session 객체에 담고
      //   session.user.id = token?.id as string;
      // }
      
      return session; // 반환해주면, client에서 접근 가능하다. 
    },
    async signIn(data: any) {
      console.log("signIn");
      console.log(data);

      try {
        // const { meta, data: token } = await snsLogin({ account, user });
        // return meta.code === 0 || `signin?errorcode=${meta.code}`
        return true;
      } catch(error){
        return false;
      }
    },
    jwt({ token, user } : any) {
      console.log('jwt');
      // if (trigger === "update") token.name = session.user.name
      
      // if (account) {
      //   token.accessToken = account?.access_token 
      //   token.id = profile?.id
      // }
      // return token
      if(user) {
        token.accessToken = user.token;
        token.id = user.user.username;
      }


      console.log(token);

      return token;
    },
  },
} as any;

export const { handlers, auth, signIn, signOut } = NextAuth(config)
