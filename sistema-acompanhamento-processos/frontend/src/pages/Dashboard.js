import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { processosService, setoresService } from '../services/api';
import ProcessoForm from '../components/ProcessoForm';
import ProcessoDetalhes from '../components/ProcessoDetalhes';
import '../styles/Dashboard.css';

function Dashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [setorFiltro, setSetorFiltro] = useState('');

  useEffect(() => {
    carregarProcessos();
    carregarSetores();
  }, []);

  const carregarSetores = async () => {
    try {
      const response = await setoresService.listar();
      setSetores(response.data);
    } catch (error) {
      console.error('Erro ao carregar setores:', error);
    }
  };

  const carregarProcessos = async () => {
    try {
      const response = await processosService.listar();
      setProcessos(response.data);
    } catch (error) {
      console.error('Erro ao carregar processos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este processo?')) {
      try {
        await processosService.deletar(id);
        carregarProcessos();
        setProcessoSelecionado(null);
      } catch (error) {
        alert('Erro ao deletar processo');
      }
    }
  };

  const processosFiltrados = processos.filter((p) => {
    const matchTexto =
      p.numero_processo.toLowerCase().includes(filtro.toLowerCase()) ||
      p.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      p.cliente?.toLowerCase().includes(filtro.toLowerCase());

    const matchSetor = !setorFiltro || p.setor_id === parseInt(setorFiltro);

    return matchTexto && matchSetor;
  });

  const getStatusClass = (status) => {
    const statusMap = {
      'Em Análise': 'status-analise',
      'Em Andamento': 'status-andamento',
      'Pendente': 'status-pendente',
      'Concluído': 'status-concluido'
    };
    return statusMap[status] || 'status-analise';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Acompanhamento de Processos</h1>
        <div className="header-actions">
          <span>Bem-vindo, {user?.nome}</span>
          {isAdmin && (
            <button onClick={() => navigate('/admin')} className="btn-secondary">
              Painel Admin
            </button>
          )}
          <button onClick={logout} className="btn-secondary">
            Sair
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="processos-section">
          <div className="section-header">
            <h2>Processos</h2>
            <button onClick={() => setShowForm(!showForm)} className="btn-primary">
              {showForm ? 'Cancelar' : '+ Novo Processo'}
            </button>
          </div>

          {showForm && (
            <ProcessoForm
              onSuccess={() => {
                carregarProcessos();
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          <div className="filtro-container">
            <input
              type="text"
              placeholder="Buscar por número, título ou cliente..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-filtro"
            />
            <select
              value={setorFiltro}
              onChange={(e) => setSetorFiltro(e.target.value)}
              className="select-filtro"
            >
              <option value="">Todos os setores</option>
              {setores.map(setor => (
                <option key={setor.id} value={setor.id}>
                  {setor.nome}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Carregando processos...</p>
          ) : processosFiltrados.length === 0 ? (
            <p className="empty-state">
              {filtro ? 'Nenhum processo encontrado.' : 'Nenhum processo cadastrado.'}
            </p>
          ) : (
            <div className="processos-lista">
              {processosFiltrados.map((processo) => (
                <div
                  key={processo.id}
                  className={`processo-card ${processoSelecionado?.id === processo.id ? 'selected' : ''}`}
                  onClick={() => setProcessoSelecionado(processo)}
                >
                  <div className="processo-header">
                    <h3>{processo.numero_processo}</h3>
                    <span className={`status-badge ${getStatusClass(processo.status)}`}>
                      {processo.status}
                    </span>
                  </div>
                  <p className="processo-titulo">{processo.titulo}</p>
                  {processo.setor_nome && (
                    <p className="processo-setor">
                      <span className="setor-icon">📁</span> {processo.setor_nome}
                    </p>
                  )}
                  {processo.cliente && <p className="processo-cliente">Cliente: {processo.cliente}</p>}
                  <p className="processo-data">
                    Atualizado em: {new Date(processo.data_atualizacao).toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {processoSelecionado && (
          <ProcessoDetalhes
            processo={processoSelecionado}
            onClose={() => setProcessoSelecionado(null)}
            onDelete={handleDelete}
            onUpdate={carregarProcessos}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
