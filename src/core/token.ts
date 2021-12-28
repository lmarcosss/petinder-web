import jwt from "jwt-decode";
import { getAuthorizationHeader } from "./authorization";

interface Itoken {
  "upn": string;
  "userId": number;
}

export function decodedToken(): Itoken {
    const headers = getAuthorizationHeader();

    return jwt(headers.Authorization);
}
