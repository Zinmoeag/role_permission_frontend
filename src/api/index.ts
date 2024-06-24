import qs from "qs";

export const getGoogleOauthUrl = () => {
     const targetUrl = "https://accounts.google.com/o/oauth2/v2/auth";

     const params = {
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL as string,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
        // state: from,
     }

    return targetUrl + "?" + qs.stringify(params);
     
};

export const loginApi = () => "/login";
export const RegisterApi = () => "/register";
