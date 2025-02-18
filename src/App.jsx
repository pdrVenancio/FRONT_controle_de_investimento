import React, { useState, useEffect } from 'react';
import InvestmentForm from './components/InvestmentForm';
import InvestmentList from './components/InvestmentList';
import InvestmentChart from './components/InvestmentChart';
import { getInvestments } from './services/api';

function App() {
    const [investments, setInvestments] = useState([]);

    // Função para buscar os investimentos
    const fetchInvestments = async () => {
        try {
            const data = await getInvestments();
            setInvestments(data);
        } catch (error) {
            console.error('Erro ao buscar investimentos:', error);
        }
    };

    // Busca os investimentos ao carregar o componente
    useEffect(() => {
        fetchInvestments();
    }, []);

    return (

        <div className="container mt-4 " >
            <h1 className="mb-4 text-center text-color-blue">Gerenciamento de Investimentos</h1>
            <InvestmentForm onInvestmentCreated={fetchInvestments} />
            <InvestmentList
                investments={investments}
                onInvestmentUpdated={fetchInvestments}
                onInvestmentDeleted={fetchInvestments}
            />
            <InvestmentChart investments={investments} />
        </div>

    );
}

export default App;