import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, pipe, Subject} from "rxjs";
import {IPump, IPumpWithDetails} from "../models/PumpEquimpInterfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IOperationResult} from "../models/OperationResult";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private pumpsSubject: BehaviorSubject<IPump[]> = new BehaviorSubject<
    IPump[]
  >([]);
  public pumps$ = this.pumpsSubject.asObservable();
  private concretePumpSubject: BehaviorSubject<IPumpWithDetails | null> = new BehaviorSubject<IPumpWithDetails | null>(null);
  public concretePump$ = this.concretePumpSubject.asObservable();

  private baseUrl = 'http://myapp.local:8000/api/Pump';
  public updatePumps(pumps: IPump[]): void {
    this.pumpsSubject.next(pumps);
  }
  constructor(private http: HttpClient) {
  }

  private findPumpById(id: string): IPump | undefined {
    const pumps = this.pumpsSubject.getValue();
    return pumps.find(p => p.id === id);
  }

  public CreatePump(pump: FormData) {
    this.http.post<string>(this.baseUrl, pump, {
      responseType: 'json',
      headers: {
        contentType: 'multipart/form-data'
      }
    }).subscribe({
      next: res => {
        console.log(res);
      },
      error: e => {
        console.log(e);
      }
    })
  }

  public UpdateConcretePump(id: string,pump : FormData){
    this.http.put<IOperationResult>(
      this.baseUrl + `/${id}`, pump,
      {
        responseType: 'json',
        headers: {
          contentType: 'multipart/form-data'
        }
      }
    ).subscribe({
      next: res => {
        console.log(res.message);
      },
      error: e => {
        console.log(e);
      }
    })
  }
  public GetConcretePump(id: string) {
    const pump = this.findPumpById(id);
    if (pump) {
      // Convert IPump to IPumpWithDetails if necessary
      const detailedPump = pump as IPumpWithDetails;

      // Fetch additional details if necessary
      if (this.NeedsMoreDetails(detailedPump)) { // Implement this function based on your needs
        this.fetchAdditionalPumpDetails(id);
      }
      else{
        this.concretePumpSubject.next(detailedPump);
      }
    }
  }
  public NeedsMoreDetails(pump : IPumpWithDetails){
    return (!pump.file || !pump.wheelmaterial || !pump.motor || !pump.framematerial);
  }
  private fetchAdditionalPumpDetails(id: string) {
    const currentPump = this.concretePumpSubject.getValue();
    if (!currentPump || currentPump.id !== id) {
      this.http.get<IPumpWithDetails>(this.baseUrl + `/${id}`).subscribe({
        next: value => {
          this.http.get(this.baseUrl + `/img/${id}`, {headers: {'Accept': 'image/jpeg'}, responseType: 'blob' }).subscribe({
            next: blob => {
              value.file = new File([blob], "pump-image.jpg", { type: 'image/jpeg'});
              this.concretePumpSubject.next(value);
            },
            error: e => {
              console.log(e);
            }
          })
        },
        error: e => {
          console.log(e);
        }
      });
    }
  }

  public GetAllPumps(): void {
    this.http.get<IPump[]>(
      this.baseUrl,
      {
        responseType: 'json',
      }
    ).subscribe({
      next: value => {
        this.updatePumps(value);
      },
      error: e => {
        console.log(e);
      }
    })
  }

  public DeletePump(id: string) {
    this.http.delete<IOperationResult>(
      this.baseUrl + `/${id}`,
      {
        responseType: 'json',
      }
    ).subscribe({
      next: value => {
       console.log(value);
      },
      error: e => {
        console.log(e);
      }
    })
  }
}
