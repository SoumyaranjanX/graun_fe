import { useMutation } from "react-query";
import { postApi } from "../services/apiinterface";

function LogInComponent() {
  const logInMutation = useMutation(payload => postApi("/api/auth/logIn", payload));

  // Handle login attempt
  const handleLogIn = async (payload:any) => {
    try {
      const user = await logInMutation.mutateAsync(payload);
      console.log("Login successful:", user);
      
    } catch (error) {
      console.error("Login failed:", error);
    
    }
  };
  handleLogIn({ username: "exampleUser", password: "examplePassword" });

  return null;
}

export default LogInComponent;
