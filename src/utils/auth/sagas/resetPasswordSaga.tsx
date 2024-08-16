import { useMutation } from "react-query";
import { postApi } from "../services/apiinterface";

const resetPasswordMutation = useMutation((body:any) => {
  const path = "/api/auth/resetPassword?token=";
  if (body?.payload?.token) {
    return postApi(`${path}${body.payload.token}`, {
      password: body.payload.password,
    });
  } else {
    return postApi(path, body.payload);
  }
});

const resetPasswordSaga = async (body:any) => {
  try {
    const data = await resetPasswordMutation.mutateAsync(body);
    console.log("Password reset successful:", data);
  } catch (error) {
    console.error("Error resetting password:", error);
  }
};

export default resetPasswordSaga;
