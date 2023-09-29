export interface IToken {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  prv: string;
  sub: string;
}
