# 📚 Sistema de Gestão de Biblioteca Comunitária

Este projeto foi desenvolvido como parte dos requisitos da disciplina de **Programação para a Internet** na **Faculdade de Tecnologia de Itu (Fatec Itu)**. O objetivo é criar um sistema funcional, responsivo e integrado ao **Supabase** para a gestão de um acervo bibliográfico compartilhado.

---

## 🎓 Identificação Acadêmica
* **Instituição:** Faculdade de Tecnologia de Itu (Fatec Itu)
* **Curso:** Gestão de Tecnologia da Informação (GTI)
* **Disciplina:** Programação para a Internet
* **Orientador:** Prof. Me. Ricardo Roberto Leme
* **Autores:** * Jair Cardoso do Nascimento
    * Tiago Ferreira da Silva

---

## 🛠️ Tecnologias Utilizadas
* **Frontend:** HTML5, JavaScript (ES6+) e [Tailwind CSS](https://tailwindcss.com/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Backend as a Service:** [Supabase](https://supabase.com/) (Auth & PostgreSQL)
* **Hospedagem:** GitHub Pages

---

## 🚀 Funcionalidades (CRUD Assíncrono)
O sistema realiza todas as operações fundamentais sem recarregamento de página, garantindo fluidez:
* **Autenticação:** Cadastro e Login de usuários via Supabase Auth.
* **Gestão de Autores:** Cadastro de novos autores com nacionalidade.
* **Catálogo de Livros:** * Cadastro de livros com atributos: Título, Autor (Foreign Key), Ano, Gênero e ISBN.
    * Visualização, Atualização e Exclusão de registros (CRUD completo).
    * Interface responsiva com cards e modais modernos.

---

## 🗄️ Estrutura do Banco de Dados (Script SQL)
[cite_start]Conforme solicitado no enunciado[cite: 35], execute o script abaixo no **SQL Editor** do Supabase para criar as tabelas e políticas de segurança (RLS):

```sql
-- 1. Criação da tabela de Autores
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(100)
);

-- 2. Criação da tabela de Livros (+5 atributos e Foreign Key)
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    ano INTEGER,
    genero VARCHAR(100),
    isbn VARCHAR(20),
    autor_id INTEGER REFERENCES autores(id) ON DELETE CASCADE
);

-- 3. Habilitação de Segurança (Row Level Security)
ALTER TABLE autores ENABLE ROW LEVEL SECURITY;
ALTER TABLE livros ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Acesso (Permitir CRUD para usuários autenticados)
CREATE POLICY "Acesso Total para Autenticados" ON autores FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso Total para Autenticados" ON livros FOR ALL TO authenticated USING (true);