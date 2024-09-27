import { Component } from '@angular/core';
import { MessagesService } from '../../Services/Messages/messages.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  message: string = '';  
  toastMessage: string = '';  
  constructor(private messagesService: MessagesService, private router: Router) { }

  sendMessage(): void {
    if (this.message == '') {
      this.toastMessage = 'the massge box is embty.'
      return
    }
    this.messagesService.sendMessage(this.message).subscribe({
      next: (res) => {
        console.log('تم الإرسال بنجاح', res);
        this.message = '';
                this.showToast(" Message send successfully!");
      },
      error: (err) => {
        console.log('فيه مشكلة في الإرسال', err);
                      this.showToast("  sorry ,check your network");

      }
    });
  }
  navigateToLogin() {
    this.router.navigate(['/Login']);
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
