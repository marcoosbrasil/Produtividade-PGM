# Histórico de Alterações

## Versão 1.1.0 - 06/02/2026

### ✨ Novidades

#### 📊 Novos Status de Processos

**Atualização dos status disponíveis:**

Os status foram reorganizados para melhor refletir o fluxo de trabalho:

**Status Anteriores:**
- ❌ Em andamento
- ❌ Concluído
- ❌ Arquivado
- ❌ Suspenso

**Novos Status:**
- ✅ **Em Análise** (padrão) - Processo está sendo analisado
- ✅ **Em Andamento** - Processo em execução
- ✅ **Pendente** - Aguardando alguma ação
- ✅ **Concluído** - Processo finalizado

**Cores dos badges:**
- 🟠 Em Análise - Laranja
- 🔵 Em Andamento - Azul
- 🟣 Pendente - Rosa/Roxo
- 🟢 Concluído - Verde

**Status padrão:** Novos processos iniciam como "Em Análise"

---

#### 🔢 ID de Processo Automático

**Mudança Principal:** O número do processo agora é **opcional**!

**Como funciona:**

1. **Opção 1 - Inserir manualmente:**
   - Você pode digitar o número do processo (ex: 0001234-56.2024.8.00.0000)
   - Útil quando você já tem um número oficial do processo

2. **Opção 2 - Gerar automaticamente:**
   - Deixe o campo em branco
   - O sistema gerará automaticamente um ID único
   - Formato: `PROC-AAAA-XXXXXXXXXX`
   - Exemplo: `PROC-2026-123456789`

**Benefícios:**
- ✅ Mais rápido para cadastrar processos
- ✅ Não precisa inventar um número
- ✅ Sistema garante que cada ID é único
- ✅ Flexibilidade: use o que preferir

**Onde ver a mudança:**
- No formulário "Novo Processo"
- O campo agora diz: "Número do Processo (Opcional)"
- Há uma dica: "Deixe em branco para gerar automaticamente"

---

## Versão 1.0.0 - 06/02/2026

### 🎉 Lançamento Inicial

**Funcionalidades:**
- Sistema de login e cadastro
- Autenticação JWT
- CRUD completo de processos
- Sistema de movimentações
- Busca e filtros
- Interface responsiva

**Tecnologias:**
- Backend: Node.js, Express, SQLite
- Frontend: React, Axios
- Autenticação: JWT + Bcrypt

---

## 📝 Como usar este arquivo

Este arquivo registra todas as mudanças importantes do sistema:
- ✨ Novidades (novas funcionalidades)
- 🔧 Correções (bugs corrigidos)
- 🚀 Melhorias (otimizações e ajustes)
- ⚠️ Mudanças importantes (breaking changes)

Sempre consulte este arquivo após atualizar o sistema!
