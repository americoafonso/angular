import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/core/model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  pt: any;

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit() {

    this.pt = {
      firstDayOfWeek: 0,
      dayNames:
      [
        'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'
      ],
      dayNamesShort:
      [
        'Sun', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
      ],
      dayNamesMin:
      [
        'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
      ],
      monthNames:
      [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      monthNamesShort:
      [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez'
      ],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    };

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  // ~> Este metodo carregarCategorias faz a mesma coisa que o metodo comentado a baixo
  carregarCategorias() {
    this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => {
        return {label: c.nome, value: c.codigo};
      });
    }).catch(erro => this.errorHandler.handle(erro));
  }

  /* carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  } */

  carregarPessoas() {
    this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => {
        return {label: p.nome, value: p.codigo};
      });
    }).catch(erro => this.errorHandler.handle(erro));
  }

}
