import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {IPumpWithDetails} from "../../../models/PumpEquimpInterfaces";
import {WebService} from "../../../services/web.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-concrete-pump-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './concrete-pump-edit.component.html',
  styleUrl: './concrete-pump-edit.component.scss'
})
export class ConcretePumpEditComponent  implements OnInit, OnDestroy {
  public pumpsForm ?: FormGroup;
  public img ?: string;

  submitForm() {
    let pump = this.pumpsForm?.value;
    let pumpData = new FormData();
    pumpData.append('name', pump.name);
    pumpData.append('maxpressure', pump.maxpressure.toString());
    pumpData.append('liquidtemperature', pump.liquidtemperature.toString());
    pumpData.append('weight', pump.weight.toString());
    pumpData.append('imagename', pump.file.name);
    pumpData.append('image', '');
    pumpData.append('price', pump.price.toString());
    pumpData.append('motorid', pump.motorid.toString());
    pumpData.append('framematerialid', pump.framematerialid.toString());
    pumpData.append('wheelmaterialid', pump.wheelmaterialid.toString());
    pumpData.append('description', pump.description);
    pumpData.append('file', pump.file);
    this.webService.UpdateConcretePump(this.pump!.id, pumpData);
  }
  public OnDelete(){
    this.webService.DeletePump(this.pump!.id);
  }
  constructor(private route: ActivatedRoute) {
  }

  public pump?: IPumpWithDetails | null;
  private webService = inject(WebService);
  private pumpId: string = '0';

  private route$?: Subscription;
  private pump$?: Subscription;

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe((params) => {
      this.pumpId = params['id'];
      this.webService.GetConcretePump(this.pumpId);
    });
    this.pump$ = this.webService.concretePump$.subscribe((pump) => {
      this.pump = pump;
      if (!!this.pump) {
        this.pumpsForm = new FormGroup({
          id: new FormControl(this.pump.id, [Validators.required]),
          name: new FormControl(this.pump.name, [Validators.required]),
          maxpressure: new FormControl(this.pump.maxpressure, [Validators.required]),
          liquidtemperature: new FormControl(this.pump.liquidtemperature, [Validators.required]),
          weight: new FormControl(this.pump.weight, [Validators.required]),
          price: new FormControl(this.pump.price, [Validators.required]),
          motorid: new FormControl(this.pump.motorid, [Validators.required]),
          framematerialid: new FormControl(this.pump.framematerialid, [Validators.required]),
          wheelmaterialid: new FormControl(this.pump.wheelmaterialid, [Validators.required]),
          description: new FormControl(this.pump.description, [Validators.required]),
          file: new FormControl(this.pump.file),
        })
        this.toBase64(this.pump.file!).then((res) => this.img = res);
      }
    });


  }

  public fileSelected(event: any) {
    let file: File = event.target.files[0];
    if (
      file.type !== 'image/jpeg'
    ) {
      alert('Пожалуйста, выберите картинку (.jpg)');
      return;
    }
    if (this.pump) {
      this.pumpsForm!.get('file')!.setValue(file);
      this.pump.file = file;
      this.toBase64(this.pump.file!).then((res) => this.img = res);
    } else {
      console.error('Pump data is not loaded');
    }
  }

  public toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  get _name() {
    return this.pumpsForm?.get('name');
  }
  get _framematerialid(){
    return this.pumpsForm?.get('framematerialid');
  }
  get _motorid(){
    return this.pumpsForm?.get('motorid');
  }
  get _wheelmaterialid(){
    return this.pumpsForm?.get('wheelmaterialid');
  }
  get _maxpressure() {
    return this.pumpsForm?.get('maxpressure');
  }

  get _liquidtemperature() {
    return this.pumpsForm?.get('liquidtemperature');
  }

  get _weight() {
    return this.pumpsForm?.get('weight');
  }

  get _price() {
    return this.pumpsForm?.get('price');
  }

  get _description() {
    return this.pumpsForm?.get('description');
  }

  ngOnDestroy(): void {
    this.route$?.unsubscribe();
    this.pump$?.unsubscribe();
  }
}
