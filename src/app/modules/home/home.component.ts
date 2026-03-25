import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUperRequest } from 'src/app/models/interfaces/user/signUperRequest';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { UserService } from 'src/app/services/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('emailInput') public emailInputRef!: ElementRef;
  @ViewChild('inputPassword') public inputPasswordRef!: ElementRef;

  loginCard = true;
  private destroy$ = new Subject<void>();

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.emailInputRef.nativeElement.value = 'E-mail';
    this.inputPasswordRef.nativeElement.value = 'Senha';
    console.log("EMAIL INPUT =>", this.emailInputRef.nativeElement.value);
    console.log("PASSWORD INPUT =>", this.inputPasswordRef.nativeElement);
  }

  // LOGIN
  onSubmitLoginForm(): void {
    if (!this.loginForm.valid) return;

    this.userService.authUser(this.loginForm.value as AuthRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          console.log("RESPOSTA DA API (LOGIN):", response);

          if (response) {
            this.cookieService.set('USER_INFO', response.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);

            this.messageService.add({
              severity: 'success',
              summary: 'Login realizado com sucesso!',
              detail: `Você será redirecionado em instantes, ${response.username}.`
            });
          }
        },
        error: (erro) => {
          console.error("ERRO NO LOGIN:", erro);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao realizar login',
            detail: 'Verifique suas credenciais e tente novamente.'
          });
        }
      });
  }



  // SIGNUP
  onSubmitSignUpForm(): void {
    if (!this.signupForm.valid) return;

    this.userService.signupUser(this.signupForm.value as SignUperRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('RESPOSTA DO SIGNUP:', response);

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Usuário cadastrado com sucesso.',
            life: 3000
          });

          this.signupForm.reset();
          this.loginCard = true;
        },
        error: (erro) => {
          console.error('ERRO NO SIGNUP:', erro);

          if (erro.error) {
            console.log("BODY DO ERRO:", erro.error);
            console.log("erro.error.message:", erro.error.message);
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Verifique os dados e tente novamente.',
            life: 3000
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
