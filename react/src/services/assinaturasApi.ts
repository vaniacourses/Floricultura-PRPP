import axios from "axios";

const API_URL = "http://localhost:8080/assinaturas";

export type Assinatura = {
  idAssinatura: string;
  tipoPlano: string;
  status: string;
};

export const contratarAssinatura = async (tipoPlano: string) => {
  const response = await axios.post<Assinatura>(API_URL, { tipoPlano });
  return response.data;
};

export const consultarAssinatura = async (idAssinatura: string) => {
  const response = await axios.get<Assinatura>(`${API_URL}/${idAssinatura}`);
  return response.data;
};
