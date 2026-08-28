import AuthForm from "../components/organisms/AuthForm";
import AuthHero from "../components/organisms/AuthHero";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="lg:flex-[2]">
        <AuthHero />
      </div>

      <div className="lg:min-w-[420px] flex-1">
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
