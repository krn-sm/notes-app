import AuthForm from "../components/organisms/AuthForm";
import AuthHero from "../components/organisms/AuthHero";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-[2]">
        <AuthHero />
      </div>

      <div className="min-w-[420px] flex-1">
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
