import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
    sendEmail(to: string, subject: string, message: string): void {
        if (!to) throw new BadRequestException('User not found')

        if (!subject || !message) throw new BadRequestException('Incorrect data')

        const emailNotification: string = `Email sent to ${to}: [${subject}] ${message}`;

        return console.log(emailNotification);
    }

    sendSMS(to: string, message: string): void {
        if (!to) throw new BadRequestException('User not found')
        
        if (!message) throw new BadRequestException('Incorrect message')

        const smsNotification: string = `SMS sent to ${to}: ${message}`;

        return console.log(smsNotification);
    }
}
