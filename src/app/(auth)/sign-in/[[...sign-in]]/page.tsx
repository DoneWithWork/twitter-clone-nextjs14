import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex  flex-col gap-5 justify-center items-center">
      <div>
        <h1 className="text-center mb-5 text-lg font-semibold">
          Sign In To Twitter{" "}
        </h1>
        <SignIn path="/sign-in" />
      </div>
    </div>
  );
}
