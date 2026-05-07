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
import UsuarioPage from "../pages/UsuarioPage";
import ContatoPage from "../pages/ContatoPage";

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
      { path: "usuario", element: <UsuarioPage /> },
    ],
  },
]);
export default router;
