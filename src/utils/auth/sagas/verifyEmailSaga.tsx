import { useMutation } from "react-query";
import { getApi } from "../services/apiinterface";
import { getEmailVerificationSuccess } from "../actions/verifyEmailActions";

const verifyEmail = async (token:any) => {
  const path = "/api/auth/verifyEmail";
  const query = token ? `?token=${token}` : "";

  try {
    const verification = await getApi(`${path}${query}`);
    console.log("email verify =",verification);
    return verification;
  } catch (error) {
    throw new Error("Error verifying email: " + error);
  }
};

const useVerifyEmailMutation = () => {
  return useMutation((token:any) => verifyEmail(token), {
    onSuccess: (data) => {
      console.log("Verification Success:", data);
      getEmailVerificationSuccess(data); 
    },
    onError: (error) => {
      console.error("Error verifying email:", error);
    },
  });
};

export default useVerifyEmailMutation;
