import { SignIn } from "@clerk/clerk-react";
import React from "react";

function SignInPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-[80vh]">
        <SignIn signUpUrl="/sign-up" />
      </div>
    </>
  );
}

export default SignInPage;
