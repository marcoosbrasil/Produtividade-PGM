import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, senha) => api.post('/auth/login', { email, senha }),
  register: (nome, email, senha) => api.post('/auth/register', { nome, email, senha })
};

export const processosService = {
  listar: () => api.get('/processos'),
  buscar: (id) => api.get(`/processos/${id}`),
  criar: (dados) => api.post('/processos', dados),
  atualizar: (id, dados) => api.put(`/processos/${id}`, dados),
  deletar: (id) => api.delete(`/processos/${id}`),
  adicionarMovimentacao: (processoId, descricao) =>
    api.post(`/processos/${processoId}/movimentacoes`, { descricao })
};

export const setoresService = {
  listar: () => api.get('/setores'),
  buscar: (id) => api.get(`/setores/${id}`),
  atualizar: (id, dados) => api.put(`/setores/${id}`, dados),
  toggleAtivo: (id) => api.patch(`/setores/${id}/toggle`)
};

export const usuariosService = {
  listar: () => api.get('/usuarios'),
  buscar: (id) => api.get(`/usuarios/${id}`),
  getMeusSetores: () => api.get('/usuarios/me/setores'),
  atribuirSetores: (id, setorIds) =>
    api.put(`/usuarios/${id}/setores`, { setor_ids: setorIds }),
  removerSetor: (id, setorId) =>
    api.delete(`/usuarios/${id}/setores/${setorId}`),
  toggleAdmin: (id) => api.patch(`/usuarios/${id}/admin`)
};

export default api;
