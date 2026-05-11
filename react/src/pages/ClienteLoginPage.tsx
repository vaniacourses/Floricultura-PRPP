import { useNavigate } from "react-router-dom";

const ClienteLoginPage = () => {
  const navigate = useNavigate();

  const goToRegister = () => navigate("/cliente-registro");
  const goToAdmin = () => navigate("/admin-login");

  const handleGoogleLogin = () => {
    console.log("Fazendo Login com o Google");
    //colocar aqui lógica de login
  };

  return (
    <main className="h-[calc(100vh-145px)] flex overflow-hidden bg-white">
      {/* LADO ESQUERDO */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 md:px-12">
        <h1 className="mb-10 text-3xl font-bold text-rosa-text">
          Tudo São Flores
        </h1>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex items-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-2.5 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google Logo"
            className="h-5 w-5"
          />

          <span className="text-base font-medium text-gray-700">
            Fazer login com o Google
          </span>
        </button>

        <div className="mt-8 flex flex-col items-center gap-4 text-sm">
          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <span
              onClick={goToRegister}
              className="cursor-pointer font-bold text-green-700 hover:underline"
            >
              Cadastre-se aqui
            </span>
          </p>

          <span
            onClick={goToAdmin}
            className="cursor-pointer text-gray-400 underline hover:text-gray-600"
          >
            Não sou cliente, sou Administrador
          </span>
        </div>
      </section>

      {/* LADO DIREITO */}
      <section className="hidden md:block flex-1 h-full bg-gray-50">
        <img
          src="/assets/flor-login.jpg"
          alt="Flores"
          className="h-full w-full object-cover object-center"
        />
      </section>
    </main>
  );
};

export default ClienteLoginPage;
