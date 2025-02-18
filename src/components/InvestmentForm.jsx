import React, { useState } from 'react';
import { createInvestment } from '../services/api';

const InvestmentForm = ({ onInvestmentCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        value: '',
        investmentDate: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.type || !formData.value || !formData.investmentDate) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        try {
            await createInvestment(formData);
            setError('');
            setFormData({ name: '', type: '', value: '', investmentDate: '' });
            onInvestmentCreated(); // Atualiza a lista de investimentos
        } catch (err) {
            setError('Erro ao cadastrar investimento.');
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title text-color-blue">Cadastrar Investimento</h5>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo</label>
                        <select
                            className="form-select"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Ação">Ação</option>
                            <option value="Fundo">Fundo</option>
                            <option value="Título">Título</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Valor</label>
                        <input
                            type="number"
                            className="form-control"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Data do Investimento</label>
                        <input
                            type="date"
                            className="form-control"
                            name="investmentDate"
                            value={formData.investmentDate}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};

export default InvestmentForm;