import { post } from "../HTTP_Functions/POST";

export async function getIdToken(userToken) {
  const firebaseGetTokenUrl = `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
  if (!userToken) throw new Error("no data");
  const getIdToken = await post(firebaseGetTokenUrl, {
    grant_type: "refresh_token",
    refresh_token: userToken,
  });
  if (getIdToken?.error) {
    const errMsg = getIdToken?.error.message;
    throw new Error(errMsg);
  }

  return { getIdToken };
}