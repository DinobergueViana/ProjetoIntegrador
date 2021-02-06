// variaveis form-tarefa
const formTarefa = document.getElementById('formTarefa');
const inputsNovaTarefa = document.querySelectorAll('.input-tarefa');
const btnNovaTarefa = document.getElementById('btnNovaTarefa');
const btnTarefaEnviar = document.getElementById('btnTarefaEnviar');

/*------------------------------------------------------------*/

// variaveis form-turma
const formTurma = document.getElementById('formTurma');
const inputsNovaTurma = document.querySelectorAll('.input-turma')
const btnNovaTurma = document.getElementById('btnNovaTurma');
const turmaSerie = document.getElementById('turmaSerie');
const turmaNivel = document.getElementById('turmaNivel');
const turmaTurno = document.getElementById('turmaTurno');
const msgErroTurmaCriar = document.getElementById('msgErroTurmaCriar');
const msgSucessoTurmaCriar = document.getElementById('msgSucessoTurmaCriar');
const btnTurmaEnviar = document.getElementById('btnTurmaEnviar');
var serie;
var nivel;
var turno;

/* inicio da area de criação de uma nova turma */

const TurmaCriar = async (serie, nivel, turno) => {
  let strTurmaJson = JSON.stringify({serie, nivel, turno});
  console.log(strTurmaJson);

  await fetch("/admin/turmas/criar", {
    method: "POST",
    body: strTurmaJson,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(resultado => {
    console.log(resultado);
  })


  function sucessoTurma() {
    msgErroTurmaCriar.style.display = "none";
    msgSucessoTurmaCriar.style.display = "flex";
    turmaSerie.value = "";
    turmaNivel.value = "";
    turmaTurno.value = "";
    btnTurmaEnviar.innerText = "Enviar";
    setTimeout(verifarInputs(inputsNovaTurma, btnTurmaEnviar), 2000);
    
    // atrasa o reload da pagina
    function sleepTurma(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function recarregarPaginaTurma() {

      await sleepTurma(2000);
      // recarrega a pagina apos 2 segundos
      window.location.reload();
    }
    
    recarregarPaginaTurma();
  }

  let msgSucessoTurma = setTimeout(sucessoTurma, 2000);

}

formTurma.addEventListener('keyup', () => {
  serie = turmaSerie.value.trim();
  nivel = turmaNivel.value.trim();
  turno = turmaTurno.value.trim();
})

formTurma.addEventListener('change', () => {
  serie = turmaSerie.value.trim();
  nivel = turmaNivel.value.trim();
  turno = turmaTurno.value.trim();
})

formTurma.onsubmit = (event) => {
  event.preventDefault()
  console.log(`Serie: ${serie}, Nivel: ${nivel}, Turno: ${turno}`)
  if(serie.length >= 3 && nivel.length >= 3 && turno.length){
    msgErroTurmaCriar.style.visibility = "hidden";
    btnTurmaEnviar.innerHTML = `Enviando <span id="spinnerTurma" class="spinner-border spinner-border-sm enviando" role="status" aria-hidden="true"></span>`;
    TurmaCriar(serie, nivel, turno);
  } else {
    msgErroTurmaCriar.style.visibility = "visible";
    btnTurmaEnviar.innerText = "Enviar";
  }
}

/* fim da area de criação de uma nova turma*/ 

/*-------------------------------------------------------------*/ 
// variaveis form-disciplina
const formDisciplina = document.getElementById('formDisciplina');
const inputsNovaDisciplina = document.querySelectorAll('.input-disciplina')
const btnNovaDisciplina = document.getElementById('btnNovaDisciplina');
const btnDisciplinaEnviar = document.getElementById('btnDisciplinaEnviar');

/* ---------------------------------------------------------------------------------------- */
// variaveis que serão usadas para validar o formulario de criar uma disciplina
const disciplinaNome = document.getElementById('disciplinaNome');
const disciplinaDescricao = document.getElementById('disciplinaDescricao');
const spinner = document.getElementById('spinner');
const msgErroDisciplinaCriar = document.getElementById('msgErroDisciplinaCriar');
const msgSucessoDisciplinaCriar = document.getElementById('msgSucessoDisciplinaCriar');
var disciplina;
var descricao;

// inicio da area de criação de uma nova disciplina
const DisciplinaCriar = async (disciplina, descricao) => {
  let strJson = JSON.stringify({disciplina, descricao});
  console.log(strJson);

  await fetch("/admin/disciplinas/criar", {
    method: "POST",
    body: strJson,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(resultado => {
    console.log(resultado);
  })


  function sucesso() {
    msgErroDisciplinaCriar.style.display = "none";
    msgSucessoDisciplinaCriar.style.display = "flex";
    disciplinaNome.value = "";
    disciplinaDescricao.value = "";
    btnDisciplinaEnviar.innerText = "Enviar";
    setTimeout(verifarInputs(inputsNovaDisciplina, btnDisciplinaEnviar), 2000);
    
    // atrasa o reload da pagina
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function recarregarPagina() {

      await sleep(2000);
      // recarrega a pagina apos 2 segundos
      window.location.reload();
    }
    
    recarregarPagina();
  }

  let msgSucesso = setTimeout(sucesso, 2000);

}

formDisciplina.addEventListener('keyup', () => {
  disciplina = disciplinaNome.value.trim();
  descricao = disciplinaDescricao.value.trim();
})

formDisciplina.addEventListener('change', () => {
  disciplina = disciplinaNome.value.trim();
  descricao = disciplinaDescricao.value.trim();
})

formDisciplina.onsubmit = (event) => {
  event.preventDefault()
  if(disciplina.length >= 3 && descricao.length >= 10){
    msgErroDisciplinaCriar.style.visibility = "hidden";
    btnDisciplinaEnviar.innerHTML = `Enviando <span id="spinner" class="spinner-border spinner-border-sm enviando" role="status" aria-hidden="true"></span>`;
    DisciplinaCriar(disciplina, descricao);
  } else {
    msgErroDisciplinaCriar.style.visibility = "visible";
    btnDisciplinaEnviar.innerText = "Enviar";
  }
}
// fim da area de criação de uma nova disciplina

/*-------------------------------------------------------------*/ 
// variaveis form-professor
const formProfessor = document.getElementById('formProfessor');
const inputsNovoProfessor = document.querySelectorAll('.input-professor')
const btnNovoProfessor = document.getElementById('btnNovoProfessor');
const btnProfessorEnviar = document.getElementById('btnProfessorEnviar');

/*-------------------------------------------------------------*/ 
// variaveis form-alunos
const formAluno = document.getElementById('formAluno');
const inputsNovoAluno = document.querySelectorAll('.input-aluno')
const btnNovoAluno = document.getElementById('btnNovoAluno');
const btnAlunoEnviar = document.getElementById('btnAlunoEnviar');

/*-------------------------------------------------------------*/ 
// variaveis form-eventos
const formEvento = document.getElementById('formEvento');
const inputsNovoEvento = document.querySelectorAll('.input-evento')
const btnNovoEvento = document.getElementById('btnNovoEvento');
const btnEventoEnviar = document.getElementById('btnEventoEnviar');

// desabilita o botão de envio do formulário
// assim que a página é carrega ou recarregada
function desabilitarBotao(arrayInputs, botao){

  arrayInputs.forEach(input => {
    input.value = "";
  })
  botao.setAttribute('disabled', 'disabled');
}

// habilitar botao enviar
function habilitarBotao(inputsVazios, botao){
  
  if(inputsVazios == 0){
    msgErroTurmaCriar.visibility = "hidden";
    msgErroDisciplinaCriar.visibility = "hidden";
    return botao.removeAttribute('disabled');
  } else {
    btnTurmaEnviar.innerText = "Enviar";
    btnDisciplinaEnviar.innerText = "Enviar";
    botao.setAttribute('disabled', 'disabled');
  }

}

// verifica se os campos estão vazios
function verifarInputs(inputs, botao){
  let inputsVazios = 0;

  inputs.forEach(input => {
    if(input.value.length == 0){
      inputsVazios += 1;
    }
  })

  habilitarBotao(inputsVazios, botao)
}

// faz a chamada da função verificarInputs em duas situações
// quando há uma mudança no formulário
// e quando o usuário está digintando

/*------------------------------------------------------*/ 

btnNovaTarefa.onclick = () => {
  desabilitarBotao(inputsNovaTarefa, btnTarefaEnviar);
}

formTarefa.onkeyup = () => {
  verifarInputs(inputsNovaTarefa, btnTarefaEnviar);
}

formTarefa.onchange = () => {
  verifarInputs(inputsNovaTarefa, btnTarefaEnviar);
}

/*------------------------------------------------------*/

btnNovaTurma.onclick = () => {
  msgErroTurmaCriar.style.visibility = "hidden";
  msgSucessoTurmaCriar.style.display = "none";
  btnTurmaEnviar.innerText = "Enviar";
  desabilitarBotao(inputsNovaTurma, btnTurmaEnviar);
}

formTurma.onkeyup = () => {
  verifarInputs(inputsNovaTurma, btnTurmaEnviar);
}

formTurma.onchange = () => {
  verifarInputs(inputsNovaTurma, btnTurmaEnviar);
}

/*------------------------------------------------------*/

btnNovaDisciplina.onclick = () => {
  msgErroDisciplinaCriar.style.display = "flex";
  msgSucessoDisciplinaCriar.style.display = "none";
  btnDisciplinaEnviar.innerText = "Enviar";
  desabilitarBotao(inputsNovaDisciplina, btnDisciplinaEnviar);
}

formDisciplina.onkeyup = () => {
  verifarInputs(inputsNovaDisciplina, btnDisciplinaEnviar);
}

formDisciplina.onchange = () => {
  verifarInputs(inputsNovaDisciplina, btnDisciplinaEnviar);
}

/*------------------------------------------------------*/

btnNovoProfessor.onclick = () => {
  console.log("Clicou")
  desabilitarBotao(inputsNovoProfessor, btnProfessorEnviar);
}

formProfessor.onkeyup = () => {
  verifarInputs(inputsNovoProfessor, btnProfessorEnviar);
}

formProfessor.onchange = () => {
  verifarInputs(inputsNovoProfessor, btnProfessorEnviar);
}

/*------------------------------------------------------*/

btnNovoAluno.onclick = () => {
  desabilitarBotao(inputsNovoAluno, btnAlunoEnviar);
}

formAluno.onkeyup = () => {
  verifarInputs(inputsNovoAluno, btnAlunoEnviar);
}

formAluno.onchange = () => {
  verifarInputs(inputsNovoAluno, btnAlunoEnviar);
}

/*------------------------------------------------------*/

btnNovoEvento.onclick = () => {
  desabilitarBotao(inputsNovoEvento, btnEventoEnviar);
}

formEvento.onkeyup = () => {
  verifarInputs(inputsNovoEvento, btnEventoEnviar);
}

formEvento.onchange = () => {
  verifarInputs(inputsNovoEvento, btnEventoEnviar);
}