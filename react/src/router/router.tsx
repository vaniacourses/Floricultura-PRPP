
import Layout from "./layout";
import HomePage from "../pages/HomePage";
import FloresPage from "../pages/FloresPage";
import FloresSecas from "../pages/FloresSecas";
import ArranjosPage from "../pages/ArranjosPage";
import BuquesPage from "../pages/BuquesPage";
import KitsPage from "../pages/KitsPage";
import AcessoriosPage from "../pages/AcessoriosPage";
import DatasPage from "../pages/DatasPage";
import EventosPage from "../pages/EventosPage";
import AssinaturasPage from "../pages/AssinaturasPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ContatoPage from "../pages/ContatoPage";
import ClientePage from "../pages/perfil/ClientePage";
import ClienteLoginPage from "../pages/ClienteLoginPage";
import ClienteRegistroPage from "../pages/ClienteRegistroPage";
import ClienteRegistroGooglePage from "../pages/ClienteRegistroGooglePage";
import AdminstradorPage from "../pages/AdminstradorPage";
import AdminstradorLoginPage from "../pages/AdminstradorLoginPage";
import PerfilAdmin from "../components/admin/PerfilAdmin";
import Administradores from "../components/admin/Administradores";
import Estoque from "../components/admin/Estoque";
import Promocoes from "../components/admin/Promocoes";
import Relatorios from "../components/admin/Relatorios";
import PerfilClientePage from "../pages/perfil/PerfilClientePage";
import PedidosPage from "../pages/perfil/PedidosPage";
import AvaliacoesPage from "../pages/perfil/AvaliacoesPage";
import EnderecosPage from "../pages/perfil/EnderecosPage";
import { createBrowserRouter } from "react-router-dom";

//const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "flores", element: <FloresPage /> },
      { path: "flores-secas", element: <FloresSecas /> },
      { path: "arranjos", element: <ArranjosPage /> },
      { path: "buques", element: <BuquesPage /> },
      { path: "kits", element: <KitsPage /> },
      { path: "acessorios", element: <AcessoriosPage /> },
      { path: "datas", element: <DatasPage /> },
      { path: "eventos", element: <EventosPage /> },
      { path: "assinaturas", element: <AssinaturasPage /> },
      { path: "carrinho", element: <CarrinhoPage /> },
      { path: "contato", element: <ContatoPage /> },
      { path: "cliente-login", element: <ClienteLoginPage /> },
      { path: "cliente-registro", element: <ClienteRegistroPage /> },
      { path: "cliente-registro-google", element: <ClienteRegistroGooglePage /> },
      
      {
        path: "admin",
        element: <AdminstradorPage />,
        children: [
          { index: true, element: <PerfilAdmin /> },
          { path: "perfil-adm", element: <PerfilAdmin /> },
          { path: "estoque", element: <Estoque /> },
          { path: "promocoes", element: <Promocoes /> },
          { path: "relatorios", element: <Relatorios /> },
          { path: "administradores", element: <Administradores /> },
        ],
      },
      { path: "admin-login", element: <AdminstradorLoginPage /> },
      {
        path: "cliente",
        element: <ClientePage />,
        children: [
          { index: true, element: <PerfilClientePage /> }, 
          
          { path: "perfil", element: <PerfilClientePage /> },
          { path: "pedidos", element: <PedidosPage/> },
          { path: "avaliacoes", element: <AvaliacoesPage/> },
          { path: "enderecos", element: <EnderecosPage/> },
        ]
      }
    ],
  },
]);
export default router;
