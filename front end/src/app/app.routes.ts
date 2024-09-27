
import { Routes } from '@angular/router';
import { MessageComponent } from './Components/message/message.component';
import { MyMessagesComponent } from './Components/my-messages/my-messages.component';
import { LoginComponent } from './Components/login/login.component';
import { RestPasswordComponent } from './Components/rest-password/rest-password.component';
import { authGuard } from './Guards/guards/auth.guard';


export const routes: Routes = [
  { path: "Message", component: MessageComponent },
  { path: "myMessages", component: MyMessagesComponent ,canActivate: [authGuard]},
  { path: "Login", component: LoginComponent },
  { path: "resetPassword", component: RestPasswordComponent,canActivate: [authGuard]  },
    { path: '', redirectTo: 'Message', pathMatch: 'full' },
];
