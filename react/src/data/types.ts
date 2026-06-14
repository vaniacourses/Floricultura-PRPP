export type Produto = {
  codigo: number;        
  nome: string;
  descricao: string;
  imagem: string;        
  preco: number;         
  categoria: string;     
  quantidade: number;    
};

export type Avaliacao = {
  idAvaliacao: number;  
  texto: string;
  data: string;          
  imagem: string;        
  nota: number;
  produtoId: number;
  usuarioId: number; 
  usuarioNome: string;       
};

export interface RelatorioDTO {
  periodo: string;
  dataInicio: string;  
  dataFim: string;
  produtos: {
    totalProdutos: number;
    porCategoria: Record<string, number>;
  };
  clientes: {
    totalClientes: number;
    novosNoPeriodo: number;
  };
  assinaturas: {
    totalAtivas: number;
    novasNoPeriodo: number;
    porTipo: Record<string, number>;
  };
  ticketMedio: number;
  pedidos: {
    totalNoPeriodo: number;
    valorTotalNoPeriodo: number;
  };
  cupons: {
    totalCupons: number;
    ativos: number;
    novosNoPeriodo: number;
  };
  faturamentoTotal: number;
  vendas: {
    produtoMaisVendido: string;
    quantidadeProdutoMaisVendido: number;
    categoriaMaisVendida: string;
    topProdutos: Array<{ nome: string; quantidade: number }>;
  };
};

export interface PedidoResumoDto {
  id: number;
  clienteNome: string;
  status: string;
  valorTotal: number;
  data: string;
}

export interface EntregaResumoDto {
  id: number;
  endereco: string;
  status: string;
  origem: string;
}

export interface DashboardDto {
  pedidosHoje: PedidoResumoDto[];
  entregasHoje: EntregaResumoDto[];
  entregasAssinatura: EntregaResumoDto[];
  faturamentoHoje: number;
  totalPedidosHoje: number;
  estoqueCritico: Produto[]; 
}