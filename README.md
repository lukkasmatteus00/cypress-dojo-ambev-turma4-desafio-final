# cypress-dojo-ambev-turma4-desafio-final

em como objetivo aplicar os conhecimentos obtidos do uso do cypress para automação de UI e API

>DESAFIO AUTOMAÇÃO

Automação de UI na funcionalidade adicionar item ao carrinho, foram criados os cenarios:
1. "Deve ser adicionado 3 item diferentes com sucesso no carrinho";
2. "Não deve ser permitido inserir mais de 10 itens do mesmo produto ao carrinho"
3. "Não deve ultrapassar de R$990,00 o valor total do pedido": 
4. "Deve ser aplicado o cupom de 10% em compras de R$200 e R$600"
5. "Deve ser aplicado o cupom de 15% em compras acima de R$600"

Automação do backend na funcionalidade cupons, foram criados os cenarios:

1. "[GET] Deve retornar os cupons cadastrados";
2. "[GET] Deve retornar somente o cupom que foi informando o id"
3. "[POST] Deve ser permitido o cadastro de um novo cupom": 
4. "[POST] Não deve ser permitido o cadastro um cupom com o mesmo valor de code"
5. "[POST] Deve ser obrigario o campo 'code'"
6. "[POST] Deve ser obrigario o campo 'amount'"
7. "[POST] Deve ser obrigario o campo 'discount_type'"
8. "[POST] Deve ser obrigario o campo 'description'"


> Observações solicitadas

Preferencialmente desenvolver com linguagem Javascript, usando custom commands e page objects.

---
## Índice

- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Executar o teste](#executar-o-teste)
- [Considerações Finais](#considerações-finais)
---
## Tecnologias utilizadas
---
Para o desafio, foram ultilizadas as seguintes tecnologias:
- Javascript
- cypress
- node
---

## Executar o teste

Para executar o projeto, basta seguir no seu terminal predileto para o diretório do projeto e executar o seguinte comando:

```bash
  $ npm install
```
e

```bash
  $ npx cypress open
```
---
## Considerações Finais
```
UFA! Deu trabalho! rsrs e valeu a pena. Pois foi um exercício interessante reativar os conhecimentos. 
Em resumo, o desafio foi divertido, pude aplicar nos testes algumas tecnicas e tentar deixar o mais simples possivel. Espero ter conseguido mostrar o que foi solicitado.
```
Durantes a automação dos cenarios de testes solicitados observei que a aplicação não condiz com os requisitos apresentados para a criação dos cenarios tanto na API quando no UI.

*Requisitos de UI:*
Regras de negócio: 
- Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho; *(Só apresenta uma mensagem de alerta quando a quantidade é superior a 100)*
- Os valores não podem ultrapassar a R$ 990,00; *(Não tem nenhum limitador para o carrinho)*
- Valores entre R$ 200 e R$ 600 , ganham cupom de 10%; *(Aplicando o cupon de 10% o desconto é maior do que o informado. Além de que comprar com os valores informados não ganham cupons de desconto)*
- Valores acima de R$ 600 ganham cupom de 15% *(Aplicando o cupon de 10% o desconto é maior do que o informado. Além de que comprar com os valores informados não ganham cupons de desconto)*


*Requisitos de API:*
Regras de negócio:
- Deve cadastrar os cupons com os campos obrigatórios abaixo:
1. Código do cupom: Exemplo: “Ganhe10” 
2. Valor: “10.00”
3. Tipo do desconto: “fixed_product”
4. Descrição: “Cupom de teste”
*(os campos valor, tipo de desconto e descrição não são obrigatorios para a criação de um novo cupom)*

Vale reforçar que os testes não finalizam os pedidos, porém antes de cada execução funcional é limpo o carrinho e todas as validação estão somente e unicamente direcionada no carrinho de compras, por este motivo não houve a necessidade dos testes finalizar o pedido com os items nos carrinhos.



