import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
form!: FormGroup;

get m(): any{
  return this.form.controls;
}

  constructor(private mf: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void{
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.mustMatch('senhaPerfil', 'confirmarSenhaPerfil')
    };

    this.form = this.mf.group({
      primeiroNomePerfil:['', [Validators.required, Validators.maxLength(50)]],
      ultimoNomePerfil:['', [Validators.required, Validators.maxLength(50)]],
      emailPerfil:['', [Validators.required, Validators.email]],
      telefonePerfil:['', Validators.required],
      senhaPerfil:['', [Validators.required, Validators.minLength(6)]],
      confirmarSenhaPerfil: ['', Validators.required]
    }, formOptions);
  }

  public resetForm(): void{
    event?.preventDefault();
    this.form.reset();
  }

}
