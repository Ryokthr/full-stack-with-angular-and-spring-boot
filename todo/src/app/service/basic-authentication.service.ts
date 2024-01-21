import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  authenticate(username: string, password: string) {
    // console.log('before ' + this.isUserLogggedIn());
    if (username === "in28minutes" && password === 'dummy') {
      sessionStorage.setItem('authenticaterUser', username);
      // console.log('after ' + this.isUserLogggedIn());
      return true;
    }
    return false;
  }

  isUserLogggedIn() {
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }

  executeAuthenticationService(username: string, password: string) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`, { headers }).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticaterUser', username);
          return data;
        }
      )
    );
  }

}

export class AuthenticationBean {
  constructor(public message: string) {

  }
}