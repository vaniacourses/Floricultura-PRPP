import axios from "axios";
import {
  CalendarDays,
  Mail,
  Pencil,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import type { Administrador } from "./Administradores";

export const renderAdministrador = (
  admin: Administrador,
  removerAdministrador: (adminId: number) => void,
  onEdit: (admin: Administrador) => void   // 👈 novo parâmetro
) => {
  return (
    <div
      key={admin.usuarioId}
      className="
        rounded-2xl bg-white
        p-6 shadow-sm
        border border-[#FFD6E5]
        transition-all duration-200
        hover:shadow-md
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE3ED]">
            <ShieldCheck size={30} className="text-[#B03A61]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#490829]">{admin.nome}</h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <Mail size={15} />
              {admin.email}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#FFF5F8] px-4 py-3">
                <p className="text-xs font-medium uppercase text-gray-400">
                  Nível de acesso
                </p>
                <p className="mt-1 font-semibold text-[#B03A61]">
                  {admin.nivelAcesso}
                </p>
              </div>
              <div className="rounded-xl bg-[#FFF5F8] px-4 py-3">
                <p className="text-xs font-medium uppercase text-gray-400">
                  Desde
                </p>
                <div className="mt-1 flex items-center gap-2 text-[#490829]">
                  <span className="font-semibold">{admin.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Botão Editar agora chama onEdit */}
          <button
            onClick={() => onEdit(admin)}
            className="flex items-center gap-2 rounded-xl border border-[#FFD6E5] px-4 py-2 text-sm font-medium text-[#490829] transition-all duration-200 hover:bg-[#FFF3F7]"
          >
            <Pencil size={16} />
            Editar
          </button>
          <button
            onClick={() => removerAdministrador(admin.usuarioId)}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100"
          >
            <Trash2 size={16} />
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export const renderFormAdmin = (
  modo: 'criar' | 'editar',
  adminAtual?: Administrador,
  buscarAdministradores?: () => Promise<void>
): void => {
  const ehEdicao = modo === 'editar' && adminAtual;

  // Overlay escuro
  const overlay = document.createElement("div");
  overlay.id = "admin-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(73, 8, 41, 0.7)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  });

  // Modal
  const modal = document.createElement("div");
  Object.assign(modal.style, {
    backgroundColor: "#FFEEF2",
    border: "2px solid #FFC7DB",
    borderRadius: "16px",
    padding: "32px",
    width: "450px",
    maxWidth: "90%",
    boxShadow: "0 20px 40px rgba(73, 8, 41, 0.3)",
    animation: "modalEntrada 0.3s ease-out",
  });

  // Animação
  const estilo = document.createElement("style");
  estilo.textContent = `
    @keyframes modalEntrada {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(estilo);

  // Valores iniciais
  const nomeInicial = ehEdicao ? adminAtual.nome : '';
  const emailInicial = ehEdicao ? adminAtual.email : '';
  const nivelInicial = ehEdicao ? adminAtual.nivelAcesso : '';

  // Título e texto do botão
  const titulo = ehEdicao ? 'Editar Administrador' : 'Adicionar Administrador';
  const textoBotao = ehEdicao ? 'Salvar alterações' : 'Confirmar cadastro';

  // Conteúdo do modal
  modal.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 2px solid #FFC7DB; padding-bottom: 16px;">
      <h2 style="margin: 0; color: #490829; font-size: 1.5rem; font-weight: bold;">${titulo}</h2>
      <button id="fechar-modal-btn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #490829; padding: 4px 8px; border-radius: 4px;">&times;</button>
    </div>
    <form id="form-admin" style="display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="color: #490829; font-weight: 600; font-size: 0.9rem;">Nome completo</label>
        <input type="text" id="admin-nome" placeholder="Digite o nome" required value="${nomeInicial}"
          style="padding: 12px; border: 2px solid #FFC7DB; border-radius: 8px; background: white; color: #490829; outline: none;">
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="color: #490829; font-weight: 600; font-size: 0.9rem;">E-mail</label>
        <input type="email" id="admin-email" placeholder="Digite o e-mail" required value="${emailInicial}"
          style="padding: 12px; border: 2px solid #FFC7DB; border-radius: 8px; background: white; color: #490829; outline: none;">
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="color: #490829; font-weight: 600; font-size: 0.9rem;">Nível de acesso</label>
        <select id="admin-nivel" required
          style="padding: 12px; border: 2px solid #FFC7DB; border-radius: 8px; background: white; color: #490829; outline: none; cursor: pointer;">
          <option value="">Selecionar nível...</option>
          <option value="SUPER_ADMIN" ${nivelInicial === "SUPER_ADMIN" ? "selected" : ""}>SUPER ADMIN</option>
          <option value="GERENTE" ${nivelInicial === "GERENTE" ? "selected" : ""}>GERENTE</option>
          <option value="ATENDENTE" ${nivelInicial === "ATENDENTE" ? "selected" : ""}>ATENDENTE</option>
        </select>
      </div>
      <button type="submit" id="confirmar-btn"
        style="margin-top: 8px; padding: 14px; background: linear-gradient(135deg, #B03A61, #490829); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">
        ${textoBotao}
      </button>
    </form>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Fechar modal
  const fecharModal = (): void => {
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s";
    setTimeout(() => {
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
      if (document.head.contains(estilo)) document.head.removeChild(estilo);
    }, 300);
  };

  // Aguardar renderização para anexar eventos
  setTimeout(() => {
    const fecharBtn = document.getElementById("fechar-modal-btn");
    const nomeInput = document.getElementById("admin-nome") as HTMLInputElement | null;
    const emailInput = document.getElementById("admin-email") as HTMLInputElement | null;
    const nivelSelect = document.getElementById("admin-nivel") as HTMLSelectElement | null;
    const form = document.getElementById("form-admin");
    const confirmarBtn = document.getElementById("confirmar-btn");

    if (fecharBtn) fecharBtn.addEventListener("click", fecharModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) fecharModal();
    });

    // Efeitos visuais nos campos
    const campos: (HTMLElement | null)[] = [nomeInput, emailInput, nivelSelect];
    campos.forEach((campo) => {
      if (!campo) return;
      campo.addEventListener("focus", () => {
        campo.style.borderColor = "#B03A61";
        campo.style.boxShadow = "0 0 0 3px rgba(176, 58, 97, 0.15)";
      });
      campo.addEventListener("blur", () => {
        campo.style.borderColor = "#FFC7DB";
        campo.style.boxShadow = "none";
      });
      campo.addEventListener("mouseenter", () => {
        if (document.activeElement !== campo)
          campo.style.borderColor = "#FF92C2";
      });
      campo.addEventListener("mouseleave", () => {
        if (document.activeElement !== campo)
          campo.style.borderColor = "#FFC7DB";
      });
    });

    // Efeito hover no botão confirmar
    if (confirmarBtn) {
      confirmarBtn.addEventListener("mouseenter", () => {
        confirmarBtn.style.transform = "translateY(-2px)";
        confirmarBtn.style.boxShadow = "0 6px 16px rgba(176, 58, 97, 0.4)";
      });
      confirmarBtn.addEventListener("mouseleave", () => {
        confirmarBtn.style.transform = "translateY(0)";
        confirmarBtn.style.boxShadow = "none";
      });
    }

    // Submissão do formulário
    if (form) {
      form.addEventListener("submit", async (e: Event) => {
        e.preventDefault();

        const getValue = (element: HTMLElement | null): string => {
          if (!element) return "";
          if (
            element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement
          ) {
            return element.value.trim();
          }
          if ("value" in element) {
            return String((element as HTMLInputElement).value).trim();
          }
          return "";
        };

        const nome = getValue(nomeInput);
        const email = getValue(emailInput);
        const nivel = getValue(nivelSelect);

        if (!nome || !email || !nivel) {
          alert("Preencha todos os campos.");
          return;
        }

        try {
          const payload = { nome, email, nivelAcesso: nivel };

          if (ehEdicao) {
            // PUT com ID
            await axios.put(`http://localhost:8080/administrador/${adminAtual.usuarioId}`, payload);
            alert("Administrador atualizado com sucesso!");
          } else {
            // POST sem ID
            await axios.post("http://localhost:8080/administrador", payload);
            alert("Administrador cadastrado com sucesso!");
          }

          fecharModal();
          if (buscarAdministradores) await buscarAdministradores();
        } catch (error) {
          console.error(`Erro ao ${ehEdicao ? 'editar' : 'cadastrar'} administrador:`, error);
          alert(`Erro ao ${ehEdicao ? 'editar' : 'cadastrar'} administrador. Tente novamente.`);
        }
      });
    }

    // Foco no primeiro campo
    if (nomeInput) nomeInput.focus();
  }, 100);
};