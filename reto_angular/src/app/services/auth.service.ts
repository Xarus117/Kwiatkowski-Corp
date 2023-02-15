import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { RegisterData } from '../interfaces/register-data.interface';
import { RegisterStudentsData } from '../interfaces/register-data-students.interface';
import { UserDataStudent } from '../interfaces/user-data-student.interface';
import { Component, Input } from '@angular/core'; // First, import Input
import { UserDataProf } from '../interfaces/user-data-prof.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "http://127.0.0.1:8000/api";
  registerStudent: string = this.url + '/register_student';
  logUser: string = this.url + '/loginUser';
  registerProfessor: string = this.url + '/register_professor';
  getProfessor: string = this.url + '/get_professor';
  getStudent: string = this.url + '/get_student';

  user: LoginData = { Nick: '', Password: ''};
  professorRegister: RegisterData = { Nick: '', Nombre: '', Apellidos: '', Email: '', Centro: '', Password: '' };
  studentRegister: RegisterStudentsData = { Nick: '', Nombre: '', Apellidos: '', Email: '', fechaNacimiento: '', Password: '' };

  perfilStudent: UserDataStudent = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Nacimiento: '', Password: '', id: 0 };
  perfilProf: UserDataProf = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Centro: '', Password: '', id: 0 };
  login: boolean = false;
  constructor(
    private http: HttpClient,
    private readonly router: Router

  ) { }

  end_session() {
    if (this.login == true) {
      if (confirm("¿Estás seguro de que quieres cerrar sesión? ")) {
        this.router.navigate(['/login'])
        console.log(this.login = false);
      }
    }
  }

  loginUser(data: LoginData): Observable<LoginData> {

    return this.http.post<LoginData>(this.logUser, data).pipe(
      filter((value: any) => {
        if (value != undefined) {
          // console.log(value);
          /*          this.perfilStudent.id = value.data.id; */
          this.perfilStudent.Apellidos = value.data.apellidos;
          this.perfilStudent.Email = value.data.email;
          this.perfilStudent.Nacimiento = value.data.fechaNacimiento;
          this.perfilStudent.Nick = value.data.nick;
          this.perfilStudent.Nombre = value.data.nombre;
          this.perfilStudent.Password = data.Password;
          this.perfilStudent.Imagen = value.data.imagen
          this.perfilProf.Apellidos = value.data.apellidos;
          this.perfilProf.Email = value.data.email;
          this.perfilProf.Nick = value.data.nick;
          this.perfilProf.Nombre = value.data.nombre;
          this.perfilProf.Password = data.Password;
          this.perfilProf.Imagen = value.data.imagen
          this.perfilProf.Centro = value.data.centro;
          this.login = true;
          return value;

        } else {
        }
      })
    );
    console.log(this.perfilStudent)
  }

  register_student(data: RegisterStudentsData): Observable<LoginData> {
    return this.http.post<LoginData>(this.registerStudent, data).pipe(
      filter((value: any) => {
        let found = false;
        if (value != '') {
          // console.log(value);
          /*       this.perfilStudent.id = value.data.id; */
          this.perfilStudent.Apellidos = value.data.apellidos;
          this.perfilStudent.Email = value.data.email;
          this.perfilStudent.Nacimiento = value.data.centro;
          this.perfilStudent.Nick = value.data.nick;
          this.perfilStudent.Nombre = value.data.nombre;
          this.perfilStudent.Password = data.Password;
          this.perfilStudent.Imagen = value.data.imagen
          this.login = true;
          return value;
        } else {
          return value;
        }
      })
    );
  }

  register_professor(data: RegisterData): Observable<LoginData> {
    return this.http.post<LoginData>(this.registerProfessor, data).pipe(
      filter((value: any) => {
        let found = false;
        if (value != '') {
          // console.log(value);
          this.perfilProf.Apellidos = value.data.apellidos;
          this.perfilProf.Email = value.data.email;
          this.perfilProf.Centro = value.data.centro;
          this.perfilProf.Nick = value.data.nick;
          this.perfilProf.Nombre = value.data.nombre;
          this.perfilProf.Password = data.Password;
          this.perfilProf.Imagen = value.data.imagen
          this.login = true;
          return value;
        } else {
          return value;
        }
      })
    );
  }

}
