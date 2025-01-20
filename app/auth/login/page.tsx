import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
 
export default LoginPage;