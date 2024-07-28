import { SignIn, useSignIn } from "@clerk/clerk-react";
import React from "react";
import { HashLoader } from "react-spinners";

function SignInPage() {
  const { isLoaded } = useSignIn();
  return (
    <>
      <div className="flex items-center justify-center min-h-[80vh]">
        {isLoaded ? (
          <SignIn signUpUrl="/sign-up" />
        ) : (
          <div className="flex items-center justify-center">
            <HashLoader />
          </div>
        )}
      </div>
    </>
  );
}

export default SignInPage;
