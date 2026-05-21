import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const ClienteRegistroGooglePage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await api.post<{ token: string }>("/auth/register", {
        uid: user.uid,
        email: user.email,
        nome: user.displayName,
      });

      login(response.token);
      navigate("/cliente-registro"); // continua o cadastro completo
    } catch (error: any) {
      console.error("Erro no registro:", error);
      alert("Falha ao registrar. Tente novamente.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-rosa-claro p-6 font-menu">
      <section className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 text-center border border-rosa-pastel">
        <header className="mb-10">
          <h1 className="font-logo text-7xl text-rosa-choque mb-2 leading-tight">Boas-vindas!</h1>
          <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-rosa-text opacity-70">Conecte sua conta Google</p>
        </header>

        <button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 rounded-full border-2 border-gray-100 bg-white px-6 py-4 shadow-sm transition-all hover:border-rosa-pastel active:scale-95"
        >
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-6 w-6" />
          <span className="text-base font-bold text-gray-700">Entrar com Google</span>
        </button>
      </section>
    </main>
  );
};

export default ClienteRegistroGooglePage;