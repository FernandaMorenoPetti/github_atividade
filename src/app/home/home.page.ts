import { Component } from '@angular/core';

import { AlertController } from  '@ionic/angular' ;

import { Router } from '@angular/router' ;

//Importações necessárias para formulários
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
* Para funcionar os formulários, precisamos importar(adicionar)
* o módulo ReactiveFormsModule no arquivo .module.ts
*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public formLogin: FormGroup;

  public mensagens_validacao ={
    
    email: [
      {tipo: 'required', mensagem: 'O campo E-mail é obrigatório '},
      {tipo: 'email', mensagem: 'E-mail Inválido.'},
    ],
    senha: [
      { tipo: 'required' , mensagem: 'É obrigatório digitar a senha.' },
      { tipo: 'minlenght' , mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
      { tipo: 'maxlenght' , mensagem: 'A senha deve ter pelo menos 8 caracteres.' }
    ],

    confirmacao: [
      { tipo: 'required' , mensagem: 'É obrigatório digitar a senha.' },
      { tipo: 'minlenght' , mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
      { tipo: 'maxlenght' , mensagem: 'A senha deve ter pelo menos 8 caracteres.' }
    ],


  };

  constructor(public formBuilder: FormBuilder, public alertController: AlertController, public router: Router  ) {
    
    // Monta o formulário
   this.formLogin = formBuilder.group({
     // Declara os campos do formulários.
    
     email: ['', Validators.compose([Validators.email, Validators.required])],
     senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])],
     nome: ['', Validators.compose([Validators.nome, Validators.required])],
     sexo: ['', Validators.compose([Validators.sexo, Validators.required])],
     nascimento: ['', Validators.compose([Validators.nascimento, Validators.required])],
     confirmacao: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])],
     CPF: ['', Validators.compose([Validators.CPF, Validators.required])]
     
   });

  }

  public login(){
    if(this.formLogin.valid){

      let email = this.formLogin.value.email;
      let senha = this.formLogin.value.senha;
      let confirmacao = this.formLogin.value.confirmacao;
      

      if(senha == confirmacao) {
        this.router.navigateByUrl('painel-usuario');
      } else {
        this.alertFormInvalid()
      }

    } else {
      this.alertUserInvalid();

     }
  }

 async alertFormInvalid() {
   const alert = await this.alertController.create({
     header: 'ERRO!!!',
     message: 'A senha digitada não confere com a confirmação da senha',
     buttons: ['OK']
    });

    await alert.present();
  }



 async alertUserInvalid() {
   const alert = await this.alertController.create({
     header: 'ERRO!!!',
     message: 'A senha digitada não confere com a confirmação da senha' ,
     buttons: ['OK']
   });

   await alert.present();
 }

}
