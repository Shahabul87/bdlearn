import { RegisterForm } from "@/components/auth/register-form";

import { Header } from "@/app/(homepage)/header";


const RegisterPage = () => {
  return <>
      
    <Header  />
      <div className="mt-20 flex flex-col items-center justify-center">
        
        <RegisterForm />
      </div>
      </>;
}
 
export default RegisterPage;