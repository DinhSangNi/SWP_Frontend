import RegisterForm from "@/components/Form/FormRegister";
function SignUp() {
    return (
        <>
            <div className="flex flex-col justify-center items-start px-[35rem] gap-y-[2rem] py-[1.4rem]">
                <h1 className="text-[2rem] font-bold ">Create account</h1>
                <div className="w-full">
                    <RegisterForm />
                </div>
            </div>
        </>
    );
}
export default SignUp;
