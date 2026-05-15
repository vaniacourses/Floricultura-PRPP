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
};