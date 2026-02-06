# 📊 Guia de Status dos Processos

## 🎯 Visão Geral

O sistema possui 4 status para acompanhar o ciclo de vida de cada processo:

```
Em Análise → Em Andamento → Pendente → Concluído
     ↓            ↓              ↓           ↓
  (Início)    (Execução)    (Aguardando) (Finalizado)
```

---

## 📋 Status Disponíveis

### 🟠 1. Em Análise (Padrão)

**Quando usar:**
- Processo recém-cadastrado
- Aguardando análise inicial
- Em fase de avaliação
- Coletando informações

**Cor:** Laranja
**Status inicial:** Todos os novos processos iniciam neste status

**Exemplo:**
- Processo acabou de chegar
- Ainda não começou a trabalhar nele
- Analisando documentação inicial

---

### 🔵 2. Em Andamento

**Quando usar:**
- Trabalho ativo no processo
- Ações sendo executadas
- Processo em desenvolvimento
- Aguardando retorno de terceiros (ativo)

**Cor:** Azul
**Indica:** Processo está sendo trabalhado ativamente

**Exemplo:**
- Preparando documentos
- Executando tarefas
- Em fase de implementação
- Aguardando resposta (mas com acompanhamento ativo)

---

### 🟣 3. Pendente

**Quando usar:**
- Aguardando ação externa
- Bloqueado por algum motivo
- Esperando documentação
- Aguardando decisão
- Pausado temporariamente

**Cor:** Rosa/Roxo
**Indica:** Processo parado esperando algo

**Exemplo:**
- Aguardando cliente enviar documentos
- Esperando decisão judicial
- Falta de informação necessária
- Aguardando aprovação

---

### 🟢 4. Concluído

**Quando usar:**
- Processo finalizado
- Objetivo alcançado
- Todas as etapas completas
- Arquivado como resolvido

**Cor:** Verde
**Indica:** Processo terminado com sucesso

**Exemplo:**
- Ação concluída
- Objetivo atingido
- Não requer mais acompanhamento

---

## 🔄 Fluxo Típico

### Cenário 1: Fluxo Completo

```
1. Em Análise
   ↓ (Análise concluída, iniciando trabalho)
2. Em Andamento
   ↓ (Todas as etapas concluídas)
3. Concluído
```

### Cenário 2: Com Pendência

```
1. Em Análise
   ↓ (Iniciou análise)
2. Em Andamento
   ↓ (Cliente não enviou documento)
3. Pendente
   ↓ (Documento recebido, retomando)
4. Em Andamento
   ↓ (Finalizado)
5. Concluído
```

### Cenário 3: Múltiplas Pendências

```
1. Em Análise
   ↓
2. Em Andamento
   ↓ (Bloqueio 1)
3. Pendente
   ↓ (Desbloqueou)
4. Em Andamento
   ↓ (Bloqueio 2)
5. Pendente
   ↓ (Desbloqueou)
6. Em Andamento
   ↓
7. Concluído
```

---

## 🎨 Cores e Identificação Visual

### No Dashboard:

```
┌────────────────────────────────────────┐
│ PROC-2026-123  [Em Análise]    🟠     │
│ Ação de Cobrança                       │
│ Cliente: João Silva                    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ PROC-2026-456  [Em Andamento]  🔵     │
│ Processo Trabalhista                   │
│ Cliente: Maria Santos                  │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ PROC-2026-789  [Pendente]      🟣     │
│ Inventário                             │
│ Cliente: José Costa                    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ PROC-2026-012  [Concluído]     🟢     │
│ Divórcio Consensual                    │
│ Cliente: Ana Lima                      │
└────────────────────────────────────────┘
```

---

## 📝 Boas Práticas

### ✅ Faça:

1. **Inicie sempre em "Em Análise"**
   - Processo novo = Em Análise

2. **Mude para "Em Andamento" quando começar a trabalhar**
   - Só mude quando realmente começar

3. **Use "Pendente" para bloqueios**
   - Deixe claro que está esperando algo
   - Adicione movimentação explicando o motivo

4. **Marque "Concluído" apenas quando finalizar**
   - Não use para processos arquivados temporariamente

5. **Registre movimentações ao mudar status**
   - Explique por que mudou
   - Facilita o acompanhamento

### ❌ Evite:

1. **Pular status sem necessidade**
   - De "Em Análise" direto para "Concluído" (sem passar por Andamento)

2. **Deixar em "Em Andamento" quando está parado**
   - Se parou, mude para "Pendente"

3. **Usar "Concluído" para pausar**
   - Use "Pendente" para pausas

4. **Não documentar mudanças**
   - Sempre registre o porquê da mudança

---

## 🔍 Filtrando por Status

Você pode usar a busca para filtrar processos por status:

```
Digite na busca: "Em Análise"
Resultado: Todos os processos em análise

Digite na busca: "Pendente"
Resultado: Todos os processos pendentes

Digite na busca: "Concluído"
Resultado: Todos os processos concluídos
```

---

## 📊 Exemplos Práticos

### Exemplo 1: Ação de Cobrança

**Status:** Em Análise
```
Movimentação: "Processo recebido. Analisando documentação inicial."
```

**Status:** Em Andamento
```
Movimentação: "Análise concluída. Iniciando elaboração da petição."
```

**Status:** Pendente
```
Movimentação: "Aguardando cliente enviar comprovantes de pagamento."
```

**Status:** Em Andamento
```
Movimentação: "Comprovantes recebidos. Finalizando petição."
```

**Status:** Concluído
```
Movimentação: "Petição protocolada. Processo concluído."
```

---

### Exemplo 2: Processo Trabalhista

**Status:** Em Análise
```
Movimentação: "Cliente relatou demissão sem justa causa. Coletando informações."
```

**Status:** Em Andamento
```
Movimentação: "Documentação completa. Preparando reclamação trabalhista."
```

**Status:** Concluído
```
Movimentação: "Acordo judicial firmado. Processo encerrado."
```

---

## ❓ Perguntas Frequentes

### 1. Qual a diferença entre "Pendente" e "Em Análise"?
**R:**
- **Em Análise** = Início, avaliação inicial
- **Pendente** = Bloqueado após já ter começado

### 2. Posso voltar de "Concluído" para outro status?
**R:** Tecnicamente sim, mas não é recomendado. Se precisar reabrir, considere criar um novo processo relacionado.

### 3. Preciso seguir a ordem dos status?
**R:** Não é obrigatório, mas é recomendado para manter o histórico lógico.

### 4. Como sei qual status usar?
**R:** Pergunte-se:
- Acabou de chegar? → Em Análise
- Estou trabalhando? → Em Andamento
- Está parado esperando algo? → Pendente
- Terminou? → Concluído

### 5. Posso adicionar mais status?
**R:** Não diretamente pela interface. Seria necessário modificar o código.

---

## 🎯 Resumo Rápido

| Status | Cor | Quando Usar | Exemplo |
|--------|-----|-------------|---------|
| Em Análise | 🟠 Laranja | Início, avaliação | Processo novo |
| Em Andamento | 🔵 Azul | Trabalho ativo | Executando tarefas |
| Pendente | 🟣 Rosa | Bloqueado, aguardando | Falta documento |
| Concluído | 🟢 Verde | Finalizado | Objetivo atingido |

---

**Dica Final:** Mantenha os status sempre atualizados e use as movimentações para explicar o contexto de cada mudança! 📝
