import { SignUp, useSignUp } from "@clerk/clerk-react";
import React from "react";
import { HashLoader } from "react-spinners";

function SignUpPage() {
  const { isLoaded } = useSignUp();
  return (
    <>
      <div className="flex items-center justify-center min-h-[80vh]">
        {isLoaded ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <SignUp signInUrl="/sign-in" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <HashLoader />
          </div>
        )}
      </div>
    </>
  );
}

export default SignUpPage;
