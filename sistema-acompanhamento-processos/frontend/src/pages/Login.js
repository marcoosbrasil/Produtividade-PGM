import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import '../styles/Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErro('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      if (isLogin) {
        const response = await authService.login(formData.email, formData.senha);
        login(response.data.token, response.data.usuario);
        navigate('/dashboard');
      } else {
        await authService.register(formData.nome, formData.email, formData.senha);
        setIsLogin(true);
        setFormData({ nome: '', email: '', senha: '' });
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
      }
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao processar requisição');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
        <p className="subtitle">Produtividade da Coordenadoria Administrativo-Financeira/PGM</p>

        {erro && <div className="erro-mensagem">{erro}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Digite seu nome"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="Digite sua senha"
              minLength="6"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <div className="toggle-form">
          {isLogin ? (
            <p>
              Não tem uma conta?{' '}
              <button onClick={() => setIsLogin(false)} className="btn-link">
                Cadastre-se
              </button>
            </p>
          ) : (
            <p>
              Já tem uma conta?{' '}
              <button onClick={() => setIsLogin(true)} className="btn-link">
                Faça login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
