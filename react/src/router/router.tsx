import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import HomePage from "../pages/HomePage";
import FloresPage from "../pages/FloresPage";
import ArranjosPage from "../pages/ArranjosPage";
import BuquesPage from "../pages/BuquesPage";
import KitsPage from "../pages/KitsPage";
import AcessoriosPage from "../pages/AcessoriosPage";
import DatasPage from "../pages/DatasPage";
import EventosPage from "../pages/EventosPage";
import AssinaturasPage from "../pages/AssinaturasPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ContatoPage from "../pages/ContatoPage";
import ClientePage from "../pages/ClientePage";
import ClienteLoginPage from "../pages/ClienteLoginPage";
import ClienteRegistroPage from "../pages/ClienteRegistroPage";
import AdminstradorPage from "../pages/AdminstradorPage";
import AdminstradorLoginPage from "../pages/AdminstradorLoginPage";
import PerfilAdmin from "../components/admin/PerfilAdmin";
import Estoque from "../components/admin/Estoque";
import Promocoes from "../components/admin/Promocoes";
import Relatorios from "../components/admin/Relatorios";
import Administradores from "../components/admin/Administradores";
//const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "flores", element: <FloresPage /> },
      { path: "arranjos", element: <ArranjosPage /> },
      { path: "buques", element: <BuquesPage /> },
      { path: "kits", element: <KitsPage /> },
      { path: "acessorios", element: <AcessoriosPage /> },
      { path: "datas", element: <DatasPage /> },
      { path: "eventos", element: <EventosPage /> },
      { path: "assinaturas", element: <AssinaturasPage /> },
      { path: "carrinho", element: <CarrinhoPage /> },
      { path: "contato", element: <ContatoPage /> },
      { path: "cliente", element: <ClientePage /> },
      { path: "cliente-login", element: <ClienteLoginPage /> },
      { path: "cliente-registro", element: <ClienteRegistroPage /> },
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
    ],
  },
]);
export default router;
