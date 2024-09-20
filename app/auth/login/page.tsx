import { Footer } from "@/app/(homepage)/footer";
import { Header } from "@/app/(homepage)/header";
import { LoginForm } from "@/components/auth/login-form";


const LoginPage = () => {
  return   <>
  
 
      <Header />
      <div className="mt-20 flex items-center justify-center">
          <LoginForm />
      </div>
      
      
    
   
  </>
}
 
export default LoginPage;