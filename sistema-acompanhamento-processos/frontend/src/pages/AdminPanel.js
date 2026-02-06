import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usuariosService, setoresService } from '../services/api';
import '../styles/AdminPanel.css';

function AdminPanel() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [setores, setSetores] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [setoresSelecionados, setSetoresSelecionados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    carregarDados();
  }, [isAdmin, navigate]);

  const carregarDados = async () => {
    try {
      const [usuariosRes, setoresRes] = await Promise.all([
        usuariosService.listar(),
        setoresService.listar()
      ]);
      setUsuarios(usuariosRes.data);
      setSetores(setoresRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelecionarUsuario = async (usuario) => {
    try {
      const response = await usuariosService.buscar(usuario.id);
      setUsuarioSelecionado(response.data);
      setSetoresSelecionados(response.data.setores?.map(s => s.id) || []);
    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
      alert('Erro ao carregar detalhes do usuário');
    }
  };

  const handleToggleSetor = (setorId) => {
    setSetoresSelecionados(prev =>
      prev.includes(setorId)
        ? prev.filter(id => id !== setorId)
        : [...prev, setorId]
    );
  };

  const handleSalvarSetores = async () => {
    if (!usuarioSelecionado) return;

    try {
      await usuariosService.atribuirSetores(usuarioSelecionado.id, setoresSelecionados);
      alert('Setores atualizados com sucesso!');
      carregarDados();
      setUsuarioSelecionado(null);
      setSetoresSelecionados([]);
    } catch (error) {
      console.error('Erro ao atualizar setores:', error);
      alert('Erro ao atualizar setores');
    }
  };

  const handleToggleAdmin = async (usuarioId) => {
    if (window.confirm('Deseja alterar o status de administrador deste usuário?')) {
      try {
        await usuariosService.toggleAdmin(usuarioId);
        carregarDados();
      } catch (error) {
        console.error('Erro ao atualizar status de admin:', error);
        alert('Erro ao atualizar status de administrador');
      }
    }
  };

  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Painel Administrativo</h1>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">
          Voltar ao Dashboard
        </button>
      </header>

      <div className="admin-content">
        <div className="usuarios-section">
          <h2>Gerenciar Usuários e Permissões</h2>
          <div className="table-container">
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Setores</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>
                      Nenhum usuário cadastrado
                    </td>
                  </tr>
                ) : (
                  usuarios.map(usuario => (
                    <tr key={usuario.id}>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <span className={`badge ${usuario.is_admin ? 'badge-admin' : 'badge-user'}`}>
                          {usuario.is_admin ? '✓ Admin' : 'Usuário'}
                        </span>
                      </td>
                      <td>
                        {usuario.total_setores > 0 ? (
                          <span className="setores-count">
                            {usuario.total_setores} setor(es)
                          </span>
                        ) : (
                          <span className="setores-count empty">Nenhum setor</span>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleSelecionarUsuario(usuario)}
                            className="btn-small btn-primary"
                          >
                            Editar Setores
                          </button>
                          <button
                            onClick={() => handleToggleAdmin(usuario.id)}
                            className="btn-small btn-secondary"
                          >
                            Toggle Admin
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {usuarioSelecionado && (
        <>
          <div className="modal-overlay" onClick={() => setUsuarioSelecionado(null)}></div>
          <div className="modal-setores">
            <h3>Setores de {usuarioSelecionado.nome}</h3>
            <p className="modal-subtitle">{usuarioSelecionado.email}</p>

            <div className="setores-checklist">
              {setores.map(setor => (
                <label key={setor.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={setoresSelecionados.includes(setor.id)}
                    onChange={() => handleToggleSetor(setor.id)}
                  />
                  <span className="checkbox-text">
                    <strong>{setor.nome}</strong>
                    {setor.descricao && (
                      <span className="setor-descricao">{setor.descricao}</span>
                    )}
                  </span>
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <button
                onClick={() => {
                  setUsuarioSelecionado(null);
                  setSetoresSelecionados([]);
                }}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button onClick={handleSalvarSetores} className="btn-primary">
                Salvar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPanel;
