import { useMutation } from "react-query";
import { postApi } from "../services/apiinterface";

const forgotPasswordMutation = useMutation((body:any) => postApi("/api/auth/forgotPassword", body.payload));

const forgotPasswordSaga = async (body:any) => {
  try {
    const res = await forgotPasswordMutation.mutateAsync(body);
    console.log("Forgot password successful:", res);
  } catch (error) {
    console.error("Error in forgot password:", error);
  }
};

export default forgotPasswordSaga;
