import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns'; // استيراد الوظيفة لحساب الفارق الزمني

@Pipe({
  name: 'timeAgo',
  standalone: true // تضمين الـ Pipe كـ Standalone
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return 'unkwon time';
    
    const date = new Date(value); // تحويل القيمة إلى تاريخ

    // حساب الفارق الزمني وعرضه
    return formatDistanceToNow(date, { addSuffix: true }); 
    // addSuffix: true يضيف كلمات مثل "منذ" أو "في"
  }
}
