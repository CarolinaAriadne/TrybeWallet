import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
      </section>
    );
  }
}

export default Table;

// FONTE DAS DEFINIÇÕES DAS TAGS ABAIXO: https://www.w3schools.com/
// Tags tabela:
// thead usada para agrupar o conteúdo do cabeçalho em uma tabela HTML.
// tr: define uma linha em uma tabela HTML.
// th: define uma célula de cabeçalho em uma tabela HTML (fica em negrito)
// td: (apesar de não estar sendo usada):define uma célula de dados padrão em uma tabela HTML (sem negrito)
