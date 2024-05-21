import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex  flex-col gap-5 justify-center items-center">
      <div>
        <h1 className="text-center mb-5 text-lg font-semibold">
          Sign Up for Twitter{" "}
        </h1>
        <SignUp path="/sign-up" />
      </div>
    </div>
  );
}
