import { useNavigate } from "react-router-dom";

const AdminstradorLoginPage = () => {
    const navigate = useNavigate();

    const goToAdmin= () => navigate("/admin");

    return (
    <div className="text-center">
        Login:
        <br />
        Senha:
        <br />
        <button
        onClick={goToAdmin}>
            Confirmar (Leva para a pagina do adm, sem lógica por enquanto)
        </button>
    </div>
  )
}
export default AdminstradorLoginPage