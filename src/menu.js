import './style.css'
import { supabase } from './supabase'

// Seletores de UI
const userEmailDisplay = document.getElementById('user-email')
const btnLogout = document.getElementById('btn-logout')
const tabLivros = document.getElementById('tab-livros')
const tabAutores = document.getElementById('tab-autores')
const sectionLivros = document.getElementById('section-livros')
const sectionAutores = document.getElementById('section-autores')

const livrosList = document.getElementById('livros-list')
const autoresList = document.getElementById('autores-list')
const selectAutor = document.getElementById('livro-autor')

const formLivro = document.getElementById('form-livro')
const formAutor = document.getElementById('form-autor')

/**
 * Proteção de Rota e Inicialização
 */
async function init() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    window.location.href = '/index.html'
    return
  }

  userEmailDisplay.textContent = session.user.email
  
  // Carregar dados iniciais
  fetchAutores()
  fetchLivros()
}

/**
 * Gerenciamento de Tabs
 */
tabLivros.addEventListener('click', () => {
  sectionLivros.classList.remove('hidden')
  sectionAutores.classList.add('hidden')
  tabLivros.className = 'border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
  tabAutores.className = 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
})

tabAutores.addEventListener('click', () => {
  sectionAutores.classList.remove('hidden')
  sectionLivros.classList.add('hidden')
  tabAutores.className = 'border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
  tabLivros.className = 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
})

/**
 * Funções de Modal (Expostas globalmente para o HTML)
 */
window.openModal = (id) => {
  document.getElementById(id).classList.remove('hidden')
}

window.closeModal = (id) => {
  document.getElementById(id).classList.add('hidden')
  if (id === 'modal-livro') formLivro.reset()
  if (id === 'modal-autor') formAutor.reset()
}

/**
 * CRUD - AUTORES
 */

async function fetchAutores() {
  const { data, error } = await supabase.from('autores').select('*').order('nome')
  
  if (error) {
    console.error('Erro ao buscar autores:', error.message)
    return
  }

  // Atualizar Lista
  autoresList.innerHTML = data.map(autor => `
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">${autor.nome}</td>
      <td class="px-6 py-4 whitespace-nowrap">${autor.nacionalidade || '-'}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onclick="editAutor(${autor.id}, '${autor.nome}', '${autor.nacionalidade}')" class="text-primary-600 hover:text-primary-900 mr-3">Editar</button>
        <button onclick="deleteAutor(${autor.id})" class="text-red-600 hover:text-red-900">Excluir</button>
      </td>
    </tr>
  `).join('')

  // Atualizar Select no form de livros
  selectAutor.innerHTML = '<option value="">Selecione um autor...</option>' + 
    data.map(autor => `<option value="${autor.id}">${autor.nome}</option>`).join('')
}

formAutor.addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = document.getElementById('autor-id').value
  const nome = document.getElementById('autor-nome').value
  const nacionalidade = document.getElementById('autor-nacionalidade').value

  const payload = { nome, nacionalidade }

  let error
  if (id) {
    const res = await supabase.from('autores').update(payload).eq('id', id)
    error = res.error
  } else {
    const res = await supabase.from('autores').insert([payload])
    error = res.error
  }

  if (error) alert('Erro ao salvar autor: ' + error.message)
  else {
    window.closeModal('modal-autor')
    fetchAutores()
  }
})

window.editAutor = (id, nome, nacionalidade) => {
  document.getElementById('autor-id').value = id
  document.getElementById('autor-nome').value = nome
  document.getElementById('autor-nacionalidade').value = nacionalidade === 'null' ? '' : nacionalidade
  document.getElementById('modal-autor-title').textContent = 'Editar Autor'
  window.openModal('modal-autor')
}

window.deleteAutor = async (id) => {
  if (!confirm('Deseja realmente excluir este autor? Todos os seus livros serão removidos.')) return
  
  const { error } = await supabase.from('autores').delete().eq('id', id)
  if (error) alert('Erro ao excluir autor: ' + error.message)
  else fetchAutores(), fetchLivros()
}

/**
 * CRUD - LIVROS
 */

async function fetchLivros() {
  const { data, error } = await supabase
    .from('livros')
    .select('*, autores(nome)')
    .order('titulo')
  
  if (error) {
    console.error('Erro ao buscar livros:', error.message)
    return
  }

  livrosList.innerHTML = data.map(livro => `
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-4">
        <div>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
            ${livro.genero || 'Geral'}
          </span>
          <h3 class="text-lg font-bold text-slate-900">${livro.titulo}</h3>
          <p class="text-sm text-slate-500">${livro.autores?.nome || 'Autor Desconhecido'}</p>
        </div>
        <div class="flex space-x-1">
          <button onclick="editLivro(${JSON.stringify(livro).replace(/"/g, '&quot;')})" class="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button onclick="deleteLivro(${livro.id})" class="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div><span class="font-medium">Ano:</span> ${livro.ano || '-'}</div>
        <div><span class="font-medium">ISBN:</span> ${livro.isbn || '-'}</div>
      </div>
    </div>
  `).join('')
}

formLivro.addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = document.getElementById('livro-id').value
  const titulo = document.getElementById('livro-titulo').value
  const ano = document.getElementById('livro-ano').value
  const genero = document.getElementById('livro-genero').value
  const isbn = document.getElementById('livro-isbn').value
  const autor_id = document.getElementById('livro-autor').value

  const payload = { titulo, ano: ano ? parseInt(ano) : null, genero, isbn, autor_id: parseInt(autor_id) }

  let error
  if (id) {
    const res = await supabase.from('livros').update(payload).eq('id', id)
    error = res.error
  } else {
    const res = await supabase.from('livros').insert([payload])
    error = res.error
  }

  if (error) alert('Erro ao salvar livro: ' + error.message)
  else {
    window.closeModal('modal-livro')
    fetchLivros()
  }
})

window.editLivro = (livro) => {
  document.getElementById('livro-id').value = livro.id
  document.getElementById('livro-titulo').value = livro.titulo
  document.getElementById('livro-ano').value = livro.ano
  document.getElementById('livro-genero').value = livro.genero
  document.getElementById('livro-isbn').value = livro.isbn
  document.getElementById('livro-autor').value = livro.autor_id
  document.getElementById('modal-livro-title').textContent = 'Editar Livro'
  window.openModal('modal-livro')
}

window.deleteLivro = async (id) => {
  if (!confirm('Deseja realmente excluir este livro?')) return
  const { error } = await supabase.from('livros').delete().eq('id', id)
  if (error) alert('Erro ao excluir livro: ' + error.message)
  else fetchLivros()
}

/**
 * Logout
 */
btnLogout.addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href = '/index.html'
})

// Iniciar app
init()
