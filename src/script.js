var mysql = require("mysql2");

//configuraçao para acessar o banco de dados
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "TODOLIST",
});


// Função responsável por conectar com o banco de dados
function conectarBancoDeDados() {

  // Verificar conexão com o banco de dados
  connection.connect(function (error) {
    if (error) {
      console.log(
        `Ocorreu um erro ao conectar no banco de dados: ${error.code}`
      );
      console.log(
        `Ocorreu um erro ao conectar no banco de dados: ${error.fatal}`
      );
    } else {
      console.log("Conectado ao banco de dados com sucesso!");
    }
  });
}


// Função responsável por adicionar item pelo evento de onkeypress no input
function adicionarItemPelaTecla(event) {
  // Pegando o tipo da tecla pelo evento
  var tecla = event.key;

  // Verificando se a tecla pressionada é o Enter
  if (tecla === "Enter") {
    // Chamando a função responsável por adicionar item
    adicionarItem();
  }
}

function adicionarItem() {
  // Invocando a função conectarBancoDeDados
  conectarBancoDeDados();

  // Pegando o elemento input
  var elementoInput = document.getElementById("input-tarefa");

  // Pegando o valor do input
  var valorInput = elementoInput.value;

  // Pegando a tag UL do nosso HTML pelo ID
  var minhaTagUL = document.getElementById("lista-de-tarefas");

  // Criando tag LI com JavaScript
  var criarTagLI = document.createElement("li");

  // Adicionando um evento de click para a tag <li>
  criarTagLI.addEventListener("click", concluirTarefa);

  // Criando uma tag em negrito
  var tagRemover =
    "<i onclick='removerItem(event)' class='fa-solid fa-circle-minus'></i>";

  // Adicionando um texto para nossa tag li criada
  criarTagLI.innerHTML = valorInput + tagRemover;

  // Adicionando a tag li para nossa ul
  minhaTagUL.appendChild(criarTagLI);

  /** ADICIONE A QUERY DE INSERT AQUI */

  var query = `INSERT INTO TODOLIST (ITEM, CONCLUIDA) VALUES ("${valorInput}", false)`;

  connection.query(query, function (error) {
    if (error) {
      console.log("erro ao registrar o usuario:", error);
    } else {
      console.log("usuario registrado com sucesso");
    }
  });




  /** ================================== */
}

// Função responsável por remover item
function removerItem(event) {
  // Pegando tag <i> dentro do nosso event
  var meuIcone = event.target;

  //pegando a tag <li> atraves da minha tag <i>
  var minhaLi = meuIcone.parentElement;

  //pegar um atributo ID da tag <li>
  var idLi = minhaLi.id;

  // query de DELETE
  var query = `DELETE FROM TODOLIST WHERE ID = ${idLi}`;

  //executando a query
  connection.query(query, function (error) {
    if (error) {
      console.log(`ocorreu um erro ao deletar no banco de dados`);
    } else {
      console.log(`tarefa removido com sucesso`);
    }
  });

  console.log(minhaLi)

  // Pegando a tag <li> através da minha tag <i> com propriedade parentElement
  var minhaLi = meuIcone.parentElement;

  // Excluindo a tag <li> com a função remove()
  minhaLi.remove();
}

// Função responsável por concluir tarefa
function concluirTarefa(event) {
  // Pegando tag <li> dentro do nosso event
  var minhaTagLi = event.target;

  minhaTagLi.className = "CONCLUIDO";
}

//função responsavel por carregar os itens do banco de dados
function carregarItensDoBancoDeDados() {
  // Invocando a função conectarBancoDeDados
  conectarBancoDeDados();

  //query de SELECT
  var query = "SELECT * FROM TODOLIST";

  //executando a query
  connection.query(query, function (error, resultados) {
    if (error) {
      console.log(`ocorreu um erro ao executar a query`);
    } else {
      console.log(resultados)
    }

    resultados.forEach(function (resultado) {

      // Pegando a tag UL do nosso HTML pelo ID
      var minhaTagUL = document.getElementById("lista-de-tarefas");

      // Criando tag LI com JavaScript
      var criarTagLI = document.createElement("li");

      criarTagLI.id = resultado.ID


      // Adicionando um evento de click para a tag <li>
      criarTagLI.addEventListener("click", concluirTarefa);



      // Criando uma tag em negrito
      var tagRemover =
        "<i onclick='removerItem(event)' class='fa-solid fa-circle-minus'></i>";

      // Adicionando um texto para nossa tag li criada
      criarTagLI.innerHTML = resultado.ITEM + tagRemover;

      // Adicionando a tag li para nossa ul
      minhaTagUL.appendChild(criarTagLI);

     
      console.log(resultado)
    })
  });
}


//chamando a função carregarItensDoBancoDeDados
carregarItensDoBancoDeDados();

