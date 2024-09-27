import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../Services/Messages/messages.service';
import { CommonModule,  } from '@angular/common';
import { TimeAgoPipe } from '../../pipe/format-date.pipe';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-my-messages',
  standalone: true,
   imports: [CommonModule, TimeAgoPipe],

  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']  
})
export class MyMessagesComponent implements OnInit {
  messages: any[] = [];  
  toastMessage: string = '';  
  constructor(private messagesService: MessagesService,private router: Router,private loginService:AuthService) { }  
ngOnInit(): void {
  this.messagesService.getAllMessaages().subscribe({
    next: (res) => {
      this.messages = res;
this.messages.sort((a, b) => {
  return new Date(b.time).getTime() - new Date(a.time).getTime();
});
      console.log(this.messages);
      

    },
    error: (err) => {
      console.log(err);
    }
  });
}
   navigateToResetPassword() {
    this.router.navigate(['/resetPassword']);
  }

  logOut() {
    localStorage.removeItem('token@12E$n7');
    this.loginService.setLoggedInState(false);
        this.router.navigate(['/Message']);

  }


   deleteMessage(id: any): void {

    this.messagesService.deleteMessage(id).subscribe({
      next: (res) => {
        console.log(res);
        
        this.messages = this.messages.filter((m) => m.id !== id);
        this.showToast("message deleted");
      },
      error: (err) => {
        console.error("Error deleting message:", err);
          this.showToast("sorry , unable to delete message");

      },
    });
  
  }
 showToast(toastMessage: string): void {
    const toastElement = document.getElementById("creatToast");
    this.toastMessage = toastMessage;
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }

}
