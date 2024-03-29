import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../interfaces/userData.interface';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TokenService } from './token.service';
import { AuthStateService } from './auth-state.service';
import { passwordData } from '../interfaces/passwordData.interface';
import { RankData } from '../interfaces/rankData.interface ';
import { RankingService } from './ranking.service';
import Swal from 'sweetalert2';
// User interface

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    rankingGen = true;
    typeUser: number = 0;
    Data: any;
    UserData: UserData = { id: 0, username: '', email: '', firstname: '', lastname: '', centro: undefined, date: undefined, password: '', imagen: '', puntosSemanales: 0 }
    RankUserData: RankData[] = [];
    timer: number = 7200000;

    public loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);
    interval: NodeJS.Timer | undefined;
    session: boolean | undefined;

    changeType(type: number) {
        this.typeUser = type;
    }

    constructor(private http: HttpClient,
        public router: Router,
        public fb: FormBuilder,
        private token: TokenService,
        public rankingService: RankingService,
    ) { }

    // User registration
    registerProfessor(user: UserData): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/registerProfessor', user);
    }
    registerStudent(user: UserData): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/registerStudent', user);
    }
    // Login
    signin(user: UserData): Observable<any> {
        return this.http.post<any>('http://127.0.0.1:8000/api/login', user).pipe(
            tap(() => this.loggedIn.next(true)
            ));
    }

    logout() { // ACABAR!!
        return this.http.get<any>('http://127.0.0.1:8000/api/login').pipe(
            tap(() => this.loggedIn.next(false)));
    }

    loginStatusChange(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }
    async profile() {
        const tokenCache: any = this.token.getToken();
        this.http.get("http://127.0.0.1:8000/api/userProfile", { headers: new HttpHeaders().set('Authorization', tokenCache) }).subscribe(data => {
            this.Data = data;
            this.UserData.id = this.Data.data.id;
            this.UserData.username = this.Data.data.username;
            this.UserData.email = this.Data.data.email;
            this.UserData.firstname = this.Data.data.firstname;
            this.UserData.lastname = this.Data.data.lastname;
            this.UserData.date = this.Data.data.date;
            this.UserData.centro = this.Data.data.center;
            this.UserData.password = this.Data.data.password;
            this.UserData.imagen = this.Data.data.imagen;
            this.UserData.puntosSemanales = this.Data.data.puntosSemanales;
            if (this.rankingGen) {
                this.rankingService.getRankingDataByUser(this.UserData.id);
                this.rankingGen = false;
            }
        });
    }

    changePassword(user: passwordData): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/changePassword', user);
    }

    setTimer() {
        this.timer = 5000;
    }

    startTimer() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        this.interval = setInterval(() => {
            swalWithBootstrapButtons.fire({
                title: '¡La sesión ha caducado!',
                text: "Ha caducado la sesión, por tanto se cerrará la página.",
                icon: 'warning',
                confirmButtonText: 'Ok',
            }).then((result) => {
                this.endSession()
                this.router.navigate(['/main']);
            })
        }, this.timer)
    }

    endSession() {
        this.token.removeToken()
        this.router.navigate(['/main']);
        this.session = false;
    }
}