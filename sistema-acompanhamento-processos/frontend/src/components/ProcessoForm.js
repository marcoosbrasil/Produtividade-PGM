import React, { useState, useEffect } from 'react';
import { processosService, setoresService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function ProcessoForm({ onSuccess, onCancel, processoEdit = null }) {
  const { isAdmin, userSetores } = useAuth();
  const [setores, setSetores] = useState([]);
  const [formData, setFormData] = useState({
    numero_processo: processoEdit?.numero_processo || '',
    titulo: processoEdit?.titulo || '',
    descricao: processoEdit?.descricao || '',
    status: processoEdit?.status || 'Em Análise',
    cliente: processoEdit?.cliente || '',
    data_inicio: processoEdit?.data_inicio || '',
    setor_id: processoEdit?.setor_id || ''
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarSetores();
  }, []);

  const carregarSetores = async () => {
    try {
      const response = await setoresService.listar();
      const setoresDisponiveis = isAdmin
        ? response.data
        : response.data.filter(s => userSetores.some(us => us.id === s.id));
      setSetores(setoresDisponiveis);

      if (setoresDisponiveis.length === 1 && !processoEdit) {
        setFormData(prev => ({ ...prev, setor_id: setoresDisponiveis[0].id }));
      }
    } catch (error) {
      console.error('Erro ao carregar setores:', error);
      setErro('Erro ao carregar setores disponíveis');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.setor_id) {
      setErro('Setor é obrigatório');
      return;
    }

    setLoading(true);
    setErro('');

    try {
      if (processoEdit) {
        await processosService.atualizar(processoEdit.id, formData);
      } else {
        await processosService.criar(formData);
      }
      onSuccess();
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao salvar processo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="processo-form">
      <h3>{processoEdit ? 'Editar Processo' : 'Novo Processo'}</h3>
      {erro && <div className="erro-mensagem">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="numero_processo">
              Número do Processo (Opcional)
              <span className="label-hint">Deixe em branco para gerar automaticamente</span>
            </label>
            <input
              type="text"
              id="numero_processo"
              name="numero_processo"
              value={formData.numero_processo}
              onChange={handleChange}
              disabled={!!processoEdit}
              placeholder="Ex: 0001234-56.2024.8.00.0000 ou deixe vazio"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="Em Análise">Em Análise</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Pendente">Pendente</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="setor_id">Setor *</label>
          <select
            id="setor_id"
            name="setor_id"
            value={formData.setor_id}
            onChange={handleChange}
            required
            disabled={setores.length === 1}
          >
            <option value="">Selecione um setor</option>
            {setores.map(setor => (
              <option key={setor.id} value={setor.id}>
                {setor.nome}
              </option>
            ))}
          </select>
          {setores.length === 0 && (
            <span className="error-hint" style={{ color: 'red', fontSize: '0.875rem' }}>
              Você não tem acesso a nenhum setor. Contate o administrador.
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            placeholder="Ex: Ação de Cobrança"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            placeholder="Descrição detalhada do processo..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cliente">Cliente</label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              placeholder="Nome do cliente"
            />
          </div>

          <div className="form-group">
            <label htmlFor="data_inicio">Data de Início</label>
            <input
              type="date"
              id="data_inicio"
              name="data_inicio"
              value={formData.data_inicio}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProcessoForm;
