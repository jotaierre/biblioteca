import{s as r}from"./supabase-xacwcY1w.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const f=document.getElementById("user-email"),h=document.getElementById("btn-logout"),m=document.getElementById("tab-livros"),c=document.getElementById("tab-autores"),p=document.getElementById("section-livros"),g=document.getElementById("section-autores"),E=document.getElementById("livros-list"),b=document.getElementById("autores-list"),B=document.getElementById("livro-autor"),w=document.getElementById("form-livro"),y=document.getElementById("form-autor");async function I(){const{data:{session:e}}=await r.auth.getSession();if(!e){window.location.href="/index.html";return}f.textContent=e.user.email,u(),d()}m.addEventListener("click",()=>{p.classList.remove("hidden"),g.classList.add("hidden"),m.className="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",c.className="border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"});c.addEventListener("click",()=>{g.classList.remove("hidden"),p.classList.add("hidden"),c.className="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",m.className="border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"});window.openModal=e=>{document.getElementById(e).classList.remove("hidden")};window.closeModal=e=>{document.getElementById(e).classList.add("hidden"),e==="modal-livro"&&w.reset(),e==="modal-autor"&&y.reset()};async function u(){const{data:e,error:o}=await r.from("autores").select("*").order("nome");if(o){console.error("Erro ao buscar autores:",o.message);return}b.innerHTML=e.map(t=>`
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">${t.nome}</td>
      <td class="px-6 py-4 whitespace-nowrap">${t.nacionalidade||"-"}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onclick="editAutor(${t.id}, '${t.nome}', '${t.nacionalidade}')" class="text-primary-600 hover:text-primary-900 mr-3">Editar</button>
        <button onclick="deleteAutor(${t.id})" class="text-red-600 hover:text-red-900">Excluir</button>
      </td>
    </tr>
  `).join(""),B.innerHTML='<option value="">Selecione um autor...</option>'+e.map(t=>`<option value="${t.id}">${t.nome}</option>`).join("")}y.addEventListener("submit",async e=>{e.preventDefault();const o=document.getElementById("autor-id").value,t=document.getElementById("autor-nome").value,n=document.getElementById("autor-nacionalidade").value,s={nome:t,nacionalidade:n};let a;o?a=(await r.from("autores").update(s).eq("id",o)).error:a=(await r.from("autores").insert([s])).error,a?alert("Erro ao salvar autor: "+a.message):(window.closeModal("modal-autor"),u())});window.editAutor=(e,o,t)=>{document.getElementById("autor-id").value=e,document.getElementById("autor-nome").value=o,document.getElementById("autor-nacionalidade").value=t==="null"?"":t,document.getElementById("modal-autor-title").textContent="Editar Autor",window.openModal("modal-autor")};window.deleteAutor=async e=>{if(!confirm("Deseja realmente excluir este autor? Todos os seus livros serão removidos."))return;const{error:o}=await r.from("autores").delete().eq("id",e);o?alert("Erro ao excluir autor: "+o.message):(u(),d())};async function d(){const{data:e,error:o}=await r.from("livros").select("*, autores(nome)").order("titulo");if(o){console.error("Erro ao buscar livros:",o.message);return}E.innerHTML=e.map(t=>{var n;return`
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-4">
        <div>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
            ${t.genero||"Geral"}
          </span>
          <h3 class="text-lg font-bold text-slate-900">${t.titulo}</h3>
          <p class="text-sm text-slate-500">${((n=t.autores)==null?void 0:n.nome)||"Autor Desconhecido"}</p>
        </div>
        <div class="flex space-x-1">
          <button onclick="editLivro(${JSON.stringify(t).replace(/"/g,"&quot;")})" class="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button onclick="deleteLivro(${t.id})" class="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div><span class="font-medium">Ano:</span> ${t.ano||"-"}</div>
        <div><span class="font-medium">ISBN:</span> ${t.isbn||"-"}</div>
      </div>
    </div>
  `}).join("")}w.addEventListener("submit",async e=>{e.preventDefault();const o=document.getElementById("livro-id").value,t=document.getElementById("livro-titulo").value,n=document.getElementById("livro-ano").value,s=document.getElementById("livro-genero").value,a=document.getElementById("livro-isbn").value,l=document.getElementById("livro-autor").value,v={titulo:t,ano:n?parseInt(n):null,genero:s,isbn:a,autor_id:parseInt(l)};let i;o?i=(await r.from("livros").update(v).eq("id",o)).error:i=(await r.from("livros").insert([v])).error,i?alert("Erro ao salvar livro: "+i.message):(window.closeModal("modal-livro"),d())});window.editLivro=e=>{document.getElementById("livro-id").value=e.id,document.getElementById("livro-titulo").value=e.titulo,document.getElementById("livro-ano").value=e.ano,document.getElementById("livro-genero").value=e.genero,document.getElementById("livro-isbn").value=e.isbn,document.getElementById("livro-autor").value=e.autor_id,document.getElementById("modal-livro-title").textContent="Editar Livro",window.openModal("modal-livro")};window.deleteLivro=async e=>{if(!confirm("Deseja realmente excluir este livro?"))return;const{error:o}=await r.from("livros").delete().eq("id",e);o?alert("Erro ao excluir livro: "+o.message):d()};h.addEventListener("click",async()=>{await r.auth.signOut(),window.location.href="/index.html"});I();
