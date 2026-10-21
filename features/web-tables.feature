# language: pt

Funcionalidade: Gerenciamento de Web Tables

  Cenário: Criar e excluir 12 registros dinamicamente
    Dado que estou na página Web Tables
    Quando eu crio 12 registros dinamicamente
    Então os 12 registros devem estar visíveis
    Quando eu excluo os 12 registros criados
    Então nenhum dos registros deve permanecer