import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; 
import axios from 'axios';

interface BotaoFavoritosProps {
    usuarioId: number;
    produtoCodigo: number;
}

const BotaoFavoritos = ({ usuarioId, produtoCodigo }: BotaoFavoritosProps) => {
    const [isFavorito, setIsFavorito] = useState(false);
    const [carregando, setCarregando] = useState(true);

    
    const API_URL = `http://localhost:8080/api/favoritos/usuario/${usuarioId}/produto/${produtoCodigo}`;

    useEffect(() => {
        if (!usuarioId || !produtoCodigo) return;

        
        axios.get(`${API_URL}/status`)
            .then(response => {
                setIsFavorito(response.data);
                setCarregando(false);
            })
            .catch(error => {
                console.error("Erro ao buscar status do favorito", error);
                setCarregando(false);
            });
    }, [usuarioId, produtoCodigo, API_URL]);

    
    const alternarFavorito = async () => {
        try {
            if (isFavorito) {
                
                await axios.delete(API_URL);
                setIsFavorito(false);
            } else {
                
                await axios.post(API_URL);
                setIsFavorito(true);
            }
        } catch (error) {
            alert("Não foi possível atualizar seus favoritos. Tente novamente.");
            console.error("Erro ao alternar favorito", error);
        }
    };

    if (carregando) return <span className="text-gray-400 text-sm">...</span>;

    return (
        <button 
            onClick={alternarFavorito}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors duration-200"
            title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
            {isFavorito ? (
                <AiFillHeart className="text-red-500 text-2xl" />
            ) : (
                <AiOutlineHeart className="text-gray-400 text-2xl hover:text-red-400" />
            )}
            <span className="text-sm font-medium text-gray-700">
                {isFavorito ? "Favoritado" : "Favoritar"}
            </span>
        </button>
    );
};

export default BotaoFavoritos;