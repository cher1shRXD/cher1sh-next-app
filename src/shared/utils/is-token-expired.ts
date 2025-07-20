export const isTokenExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const now = Math.floor(Date.now() / 1000);

    return decoded.exp < now;
  } catch (e) {
    return true;
  }
};
