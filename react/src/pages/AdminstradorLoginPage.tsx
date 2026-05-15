import { useNavigate } from "react-router-dom";

const AdminstradorLoginPage = () => {

  const navigate = useNavigate()
  //const goToAdmin = () => navigate("/admin");

  const handleGoogleLogin = () => {
    console.log("Fazendo Login com o Google");
    //colocar aqui lógica de login

  };

  return (
    <main className="h-[calc(100vh-145px)] flex overflow-hidden bg-gradient-to-br from-[#FFEEF2] via-white to-[#FFC7DB]">
      {/* LADO ESQUERDO */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 md:px-12">
       
        <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-md p-10 shadow-2xl border border-white/40">
        
        <div className="mb-10 text-center">
            
            <div className="mb-4 inline-block rounded-full bg-rose-100 px-4 py-1">
              <span className="text-xs font-semibold tracking-[0.2em] text-rose-700">
                ADMIN
              </span>
            </div>

            <h1 className="mb-2 text-3xl font-bold text-rosa-text">
            Tudo São Flores
            </h1>

            <h2 className="text-lg font-semibold text-gray-800">
              Painel Administrativo
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Gerencie produtos, pedidos e conteúdos da loja.
            </p>
        </div>


        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full justify-center flex items-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-2.5 shadow-sm transition-all duration-200 hover:shadow-md"
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

        <p className="mt-6 text-center text-xs text-gray-400">
            Acesso restrito para administradores
        </p>
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

export default AdminstradorLoginPage;
