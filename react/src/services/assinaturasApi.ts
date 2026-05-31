import { api } from "./api";

export type Assinatura = {
  idAssinatura: string;
  idUsuario?: number;
  tipoPlano: string;
  status: string;
  valorPlano?: number;
  dataContratacao?: string;
  idPedido?: number;
  estiloArranjo?: string;
  coresPreferidas?: string;
  observacao?: string;
};

export type AssinaturaPersonalizacao = {
  estiloArranjo: string;
  coresPreferidas: string;
  observacao: string;
};

export const contratarAssinatura = async (tipoPlano: string) => {
  return api.post<Assinatura>("/assinaturas", { tipoPlano });
};

export const comprarAssinatura = async (tipoPlano: string) => {
  return api.post<Assinatura>("/assinaturas/comprar", { tipoPlano });
};

export const adicionarAssinaturaAoCarrinho = async (
  tipoPlano: string,
  personalizacao: AssinaturaPersonalizacao
) => {
  return api.post("/carrinho/assinatura", { tipoPlano, ...personalizacao });
};

export const consultarAssinatura = async (idAssinatura: string) => {
  return api.get<Assinatura>(`/assinaturas/${idAssinatura}`);
};

export const consultarMinhaAssinatura = async () => {
  return api.get<Assinatura | undefined>("/assinaturas/minha");
};
