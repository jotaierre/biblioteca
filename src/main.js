import './style.css'
import { supabase } from './supabase'

const loginForm = document.getElementById('login-form')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const authError = document.getElementById('auth-error')
const btnLogin = document.getElementById('btn-login')
const btnSignup = document.getElementById('btn-signup')

/**
 * Exibe mensagens de erro na interface.
 * @param {string} message 
 */
function showError(message) {
  authError.textContent = message
  authError.classList.remove('hidden')
  setTimeout(() => authError.classList.add('hidden'), 5000)
}

/**
 * Lógica de Login
 */
async function handleLogin(e) {
  e.preventDefault()
  const email = emailInput.value
  const password = passwordInput.value

  btnLogin.disabled = true
  btnLogin.textContent = 'Carregando...'

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    showError(error.message)
    btnLogin.disabled = false
    btnLogin.textContent = 'Entrar'
  } else {
    window.location.href = '/menu.html'
  }
}

/**
 * Lógica de Cadastro
 */
async function handleSignup() {
  const email = emailInput.value
  const password = passwordInput.value

  if (!email || !password) {
    showError('Preencha email e senha para cadastrar.')
    return
  }

  btnSignup.disabled = true
  btnSignup.textContent = 'Cadastrando...'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    showError(error.message)
    btnSignup.disabled = false
    btnSignup.textContent = 'Criar conta'
  } else {
    alert('Cadastro realizado com sucesso! Verifique seu email ou tente fazer login.')
    btnSignup.disabled = false
    btnSignup.textContent = 'Criar conta'
  }
}

// Event Listeners
if (loginForm) {
  loginForm.addEventListener('submit', handleLogin)
}

if (btnSignup) {
  btnSignup.addEventListener('click', handleSignup)
}

// Verificar se o usuário já está logado
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    window.location.href = '/menu.html'
  }
}

checkSession()
