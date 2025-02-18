import React, { useState, useEffect } from 'react';
import { getInvestments, updateInvestment, deleteInvestment } from '../services/api';

const InvestmentList = ({ investments, onInvestmentUpdated, onInvestmentDeleted }) => {
    const [error, setError] = useState('');
    const [editingInvestment, setEditingInvestment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (investment) => {
        setEditingInvestment(investment);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            await updateInvestment(editingInvestment._id, editingInvestment);
            setShowModal(false);
            onInvestmentUpdated(); // Atualiza a lista de investimentos
        } catch (err) {
            setError('Erro ao atualizar investimento.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteInvestment(id);
            onInvestmentDeleted(); // Atualiza a lista de investimentos
        } catch (err) {
            setError('Erro ao excluir investimento.');
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title text-color-blue">Listagem de Investimentos</h5>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.map((investment) => (
                            <tr key={investment._id}>
                                <td>{investment.name}</td>
                                <td>{investment.type}</td>
                                <td>{investment.value}</td>
                                <td>{new Date(investment.investmentDate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(investment)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(investment._id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal de Edição */}
                {showModal && (
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar Investimento</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Nome</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editingInvestment?.name || ''}
                                                onChange={(e) =>
                                                    setEditingInvestment({
                                                        ...editingInvestment,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Tipo</label>
                                            <select
                                                className="form-select"
                                                value={editingInvestment?.type || ''}
                                                onChange={(e) =>
                                                    setEditingInvestment({
                                                        ...editingInvestment,
                                                        type: e.target.value,
                                                    })
                                                }
                                            >
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
                                                value={editingInvestment?.value || ''}
                                                onChange={(e) =>
                                                    setEditingInvestment({
                                                        ...editingInvestment,
                                                        value: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Data do Investimento</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={editingInvestment?.investmentDate?.split('T')[0] || ''}
                                                onChange={(e) =>
                                                    setEditingInvestment({
                                                        ...editingInvestment,
                                                        investmentDate: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Fechar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSave}
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvestmentList;