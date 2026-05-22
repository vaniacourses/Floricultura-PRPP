import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const ClienteRegistroGooglePage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tipoSelecionado, setTipoSelecionado] = useState<"PF" | "PJ" | null>(null);

  const handleGoogleAuth = async () => {
    if (!tipoSelecionado) return;

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Envia o tipo escolhido para o back‑end
      const response = await api.post<{ token: string }>("/auth/register", {
        uid: user.uid,
        email: user.email,
        nome: user.displayName,
        tipo: tipoSelecionado,
      });

      login(response.token);
      navigate("/cliente-registro");
    } catch (error: any) {
      console.error("Erro no registro:", error);

      if (error.status === 409) {
        // Conta já registrada
        alert("Você já possui uma conta registrada. Por favor, faça login.");
        navigate("/cliente-login");
      } else {
        alert("Falha ao registrar. Tente novamente.");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-rosa-claro p-6 font-menu">
      <section className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 text-center border border-rosa-pastel">
        <header className="mb-10">
          <h1 className="font-logo text-7xl text-rosa-choque mb-2 leading-tight">boas-vindas!</h1>
          <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-rosa-text opacity-70">
            Escolha o tipo de conta e conecte o Google
          </p>
        </header>

        {/* Seletor de tipo */}
        <div className="flex bg-rosa-claro/50 p-1.5 rounded-2xl mb-8 border border-rosa-pastel">
          <button
            type="button"
            onClick={() => setTipoSelecionado("PF")}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-black transition-all ${
              tipoSelecionado === "PF"
                ? "bg-rosa-choque text-white shadow-lg"
                : "text-rosa-text hover:bg-rosa-claro"
            }`}
          >
            PESSOA FÍSICA
          </button>
          <button
            type="button"
            onClick={() => setTipoSelecionado("PJ")}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-black transition-all ${
              tipoSelecionado === "PJ"
                ? "bg-rosa-choque text-white shadow-lg"
                : "text-rosa-text hover:bg-rosa-claro"
            }`}
          >
            PESSOA JURÍDICA
          </button>
        </div>

        {/* Botão Google (só aparece se um tipo estiver selecionado) */}
        {tipoSelecionado ? (
          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 rounded-full border-2 border-gray-100 bg-white px-6 py-4 shadow-sm transition-all hover:border-rosa-pastel active:scale-95"
          >
            <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-6 w-6" />
            <span className="text-base font-bold text-gray-700">
              Entrar com Google
            </span>
          </button>
        ) : (
          <p className="text-sm text-rosa-text opacity-60">Selecione o tipo de conta para continuar</p>
        )}
      </section>
    </main>
  );
};

export default ClienteRegistroGooglePage;