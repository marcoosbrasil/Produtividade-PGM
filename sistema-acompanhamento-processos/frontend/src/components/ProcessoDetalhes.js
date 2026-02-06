import React, { useState, useEffect } from 'react';
import { processosService } from '../services/api';
import ProcessoForm from './ProcessoForm';

function ProcessoDetalhes({ processo, onClose, onDelete, onUpdate }) {
  const [detalhes, setDetalhes] = useState(null);
  const [novaMovimentacao, setNovaMovimentacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    carregarDetalhes();
  }, [processo.id]);

  const carregarDetalhes = async () => {
    try {
      const response = await processosService.buscar(processo.id);
      setDetalhes(response.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error);
    }
  };

  const handleAdicionarMovimentacao = async (e) => {
    e.preventDefault();
    if (!novaMovimentacao.trim()) return;

    setLoading(true);
    try {
      await processosService.adicionarMovimentacao(processo.id, novaMovimentacao);
      setNovaMovimentacao('');
      carregarDetalhes();
      onUpdate();
    } catch (error) {
      alert('Erro ao adicionar movimentação');
    } finally {
      setLoading(false);
    }
  };

  if (!detalhes) {
    return (
      <div className="detalhes-container">
        <p>Carregando...</p>
      </div>
    );
  }

  if (editMode) {
    return (
      <div className="detalhes-container">
        <ProcessoForm
          processoEdit={detalhes}
          onSuccess={() => {
            setEditMode(false);
            carregarDetalhes();
            onUpdate();
          }}
          onCancel={() => setEditMode(false)}
        />
      </div>
    );
  }

  return (
    <div className="detalhes-container">
      <div className="detalhes-header">
        <h2>Detalhes do Processo</h2>
        <button onClick={onClose} className="btn-close">
          ×
        </button>
      </div>

      <div className="detalhes-content">
        <div className="info-section">
          <div className="info-item">
            <label>Número do Processo:</label>
            <p>{detalhes.numero_processo}</p>
          </div>

          <div className="info-item">
            <label>Título:</label>
            <p>{detalhes.titulo}</p>
          </div>

          <div className="info-item">
            <label>Status:</label>
            <p>{detalhes.status}</p>
          </div>

          {detalhes.cliente && (
            <div className="info-item">
              <label>Cliente:</label>
              <p>{detalhes.cliente}</p>
            </div>
          )}

          {detalhes.data_inicio && (
            <div className="info-item">
              <label>Data de Início:</label>
              <p>{new Date(detalhes.data_inicio).toLocaleDateString('pt-BR')}</p>
            </div>
          )}

          {detalhes.descricao && (
            <div className="info-item">
              <label>Descrição:</label>
              <p>{detalhes.descricao}</p>
            </div>
          )}

          <div className="info-item">
            <label>Última Atualização:</label>
            <p>{new Date(detalhes.data_atualizacao).toLocaleString('pt-BR')}</p>
          </div>
        </div>

        <div className="movimentacoes-section">
          <h3>Movimentações</h3>

          <form onSubmit={handleAdicionarMovimentacao} className="movimentacao-form">
            <textarea
              value={novaMovimentacao}
              onChange={(e) => setNovaMovimentacao(e.target.value)}
              placeholder="Adicionar nova movimentação..."
              rows="3"
              required
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Adicionando...' : 'Adicionar Movimentação'}
            </button>
          </form>

          <div className="movimentacoes-lista">
            {detalhes.movimentacoes && detalhes.movimentacoes.length > 0 ? (
              detalhes.movimentacoes.map((mov) => (
                <div key={mov.id} className="movimentacao-item">
                  <p className="movimentacao-descricao">{mov.descricao}</p>
                  <p className="movimentacao-data">
                    {new Date(mov.data_movimentacao).toLocaleString('pt-BR')}
                  </p>
                </div>
              ))
            ) : (
              <p className="empty-state">Nenhuma movimentação registrada.</p>
            )}
          </div>
        </div>

        <div className="detalhes-actions">
          <button onClick={() => setEditMode(true)} className="btn-secondary">
            Editar
          </button>
          <button onClick={() => onDelete(processo.id)} className="btn-danger">
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProcessoDetalhes;
