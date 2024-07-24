import { SignUp } from "@clerk/clerk-react";
import React from "react";

function SignUpPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-[80vh]">
        <SignUp signInUrl="/sign-in" forceRedirectUrl="/sign-in" />
      </div>
    </>
  );
}

export default SignUpPage;
