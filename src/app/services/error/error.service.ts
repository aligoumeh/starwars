import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  private _errorMessage = new BehaviorSubject<string | null>(null);
  public readonly errorMessage$ = this._errorMessage.asObservable();

  setErrorMessage(message: string | null) {
    this._errorMessage.next(message);
  }
  
}
