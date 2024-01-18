import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { logout, selectLogging } from '../store/auth';
import { AuthState } from '../store';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logging$ = this.store.select(selectLogging);

  constructor(
    private store: Store<AuthState>,
    private httpClient: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  login(data: any) {
    return this.httpClient
      .post(environment.apiUrl, data)
      .pipe(map((data: any) => data));
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  setAuthenticatedUser(data: any) {
    if (!data) {
      return;
    }
    localStorage.setItem('token', data.role);
    localStorage.setItem(
      'user',
      JSON.stringify({
        role: data.role,
      })
    );
  }

  logOut() {
    return of(localStorage.clear());
  }

  async presentToast(message, color: 'success' | 'error') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      positionAnchor: 'header',
      color: color === 'success' ? 'success' : 'danger',
      animated: true,
    });

    await toast.present();
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Estás seguro que quieres salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.store.dispatch(logout());
          },
        }
      ],
    });

    await alert.present();
  }
}
