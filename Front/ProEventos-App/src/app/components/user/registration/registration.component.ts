import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit{
  form!: FormGroup;

  get m(): any{
    return this.form.controls;
  }

  constructor(private mf: FormBuilder){}

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void{
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.mustMatch('senha', 'confirmSenha')
    };

    this.form = this.mf.group({
      primeiroNome: ['',[Validators.required, Validators.maxLength(50)]],
      ultimoNome: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      userName: ['',Validators.required],
      senha: ['',[Validators.required, Validators.minLength(6)]],
      confirmSenha: ['',Validators.required]
    }, formOptions);
  }


}
