# Encurtador de URL

API desenvolvida para receber endereços eletrônicos gigantes e devolver endereços encurtados.
Esta API foi desenvolvida em Typescript e utiliza o banco de dados MongoDB.
Usa as seguintes bibliotecas:
  * Dotenv: permite a utilização de variáveis de ambiente dentro do projeto
  * Express: provê classes para recebimento de requisições e envio de respostas
  * HTTP Status Codes: permite uma maneira mais otimizada de enviar status de resposta ao cliente
  * Mongoose: ODM que facilita as persistências e buscas de dados no banco
  * Short Id: gera endereço encurtado aleatório
  * Typegoose (@typegoose/typegoose): permite a utilização do Mongoose em Typescript<br>

## Endpoints:

1
  * path: /encurtar
  * verbo: post
  * keys (body):
    * urlOriginal: string (obrigatória) -> deve conter a url grande que o cliente deseja encurtar
    * apelido: string (opcional) -> deve conter a extensão que o usuário deseja digitar para ter acesso ao site com a url extensa; se o campo não for informado, o sistema vai sortear a extensão para o cliente
  * regras:
    * não pode haver duas referências à mesma URL original
    * não pode haver duas URL originais com o mesmo apelido
  * descrição: O cliente informa a URL original e talvez o apelido. Se informar o apelido, este ser persistido no banco e vai ser acrescentado à URL desta API, que também vai ser salvo no banco. Se não for informado, o sistema se encarregará de sortear um hash pequeno, que será persistido em banco e será acrescentado à URL desta API, gerando um URL que também será salva.

  <hr>

2
  * path: /:extensão
  * verbo: get
  * key (params): extensão: string
  * descrição: O usuário deve digitar a URL desta API mais a extensão no browser e o sistema redirecionará para a URL original.
