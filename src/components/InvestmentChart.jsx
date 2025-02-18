import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../App.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const InvestmentChart = ({ investments }) => {
    // Calcula a distribuição dos tipos de investimentos
    const types = investments.reduce((acc, investment) => {
        acc[investment.type] = (acc[investment.type] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(types),
        datasets: [
            {
                data: Object.values(types),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">Distribuição dos Tipos de Investimento</h5>
                <Doughnut data={data} />
            </div>
        </div>
    );
};

export default InvestmentChart;