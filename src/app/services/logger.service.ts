import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
    logs : string[] = [];

    logInfo(...messages : any[]) {
        // console.group();
        console.group('INFO');
        messages.forEach(msg => this.log(msg));
        console.groupEnd();
    }
    
    logError(...messages : any[]) {
        console.group('ERROR');
        messages.forEach(msg => this.log(msg, true));
    }

    private log(msg : any, isErr = false) {
        this
            .logs
            .push(msg);
        isErr
            ? console.error(msg)
            : console.log(msg);
            // : console.log(msg);
    }
}
