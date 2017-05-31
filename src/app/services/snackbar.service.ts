import {Injectable} from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

@Injectable()
export class SnackbarService {
    snackBarConfig : MdSnackBarConfig = {
        duration: 500,
        
    }
    constructor(private snackBar : MdSnackBar) {}
    show(message : string) {
        this
            .snackBar
            .open(message, null, this.snackBarConfig);
    }
}