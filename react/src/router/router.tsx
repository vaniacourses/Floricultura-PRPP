
import Layout from "./layout";
import HomePage from "../pages/HomePage";
import DetalhesPage from "../pages/DetalhesPage";
import FloresPage from "../pages/FloresPage";
import FloresSecas from "../pages/FloresSecas";
import ArranjosPage from "../pages/ArranjosPage";
import BuquesPage from "../pages/BuquesPage";
import KitsPage from "../pages/KitsPage";
import AcessoriosPage from "../pages/AcessoriosPage";
import EventosPage from "../pages/EventosPage";
import AssinaturasPage from "../pages/AssinaturasPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ContatoPage from "../pages/ContatoPage";
import PerfilAdmin from "../components/admin/PerfilAdmin";
import Estoque from "../components/admin/estoque/Estoque";
import Promocoes from "../components/admin/Promocoes";
import Relatorios from "../components/admin/Relatorios";
import Administradores from "../components/admin/Administradores";
import ClienteLoginPage from "../pages/cliente/ClienteLoginPage";
import ClienteRegistroGooglePage from "../pages/cliente/ClienteRegistroGooglePage";
import ClienteRegistroPage from "../pages/cliente/ClienteRegistroPage";
import AdminstradorLoginPage from "../pages/admin/AdminstradorLoginPage";
import AdministradorPage from "../pages/admin/AdminstradorPage";
import PerfilClientePage from "../pages/cliente/PerfilClientePage";
import PedidosPage from "../pages/cliente/PedidosPage";
import AvaliacoesPage from "../pages/cliente/AvaliacoesPage";
import EnderecosPage from "../pages/cliente/EnderecosPage";
import ClientePage from "../pages/cliente/ClientePage";
import { createBrowserRouter } from "react-router-dom";

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
      { path: "eventos", element: <EventosPage /> },
      { path: "assinaturas", element: <AssinaturasPage /> },
      { path: "carrinho", element: <CarrinhoPage /> },
      { path: "contato", element: <ContatoPage /> },
      { path: "cliente-login", element: <ClienteLoginPage /> },
      { path: "cliente-registro", element: <ClienteRegistroPage /> },
      { path: "detalhesPage/:codigo", element: <DetalhesPage /> },
      {
        path: "cliente-registro-google",
        element: <ClienteRegistroGooglePage />,
      },

      {
        path: "admin",
        element: <AdministradorPage />,
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
          { path: "pedidos", element: <PedidosPage /> },
          { path: "avaliacoes", element: <AvaliacoesPage /> },
          { path: "enderecos", element: <EnderecosPage /> },
        ],
      },
    ],
  },
]);
export default router;
