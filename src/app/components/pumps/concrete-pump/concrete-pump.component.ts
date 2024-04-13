import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPump} from "../../../models/IPump";
import {WebService} from "../../../services/web.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-concrete-pump',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './concrete-pump.component.html',
  styleUrl: './concrete-pump.component.scss'
})
export class ConcretePumpComponent implements OnInit, OnDestroy {
  public pumpsForm ?: FormGroup;

  submitForm() {
    let pump = this.pumpsForm?.value;
    let pumpData = new FormData();
    pumpData.append('name', pump.name);
    pumpData.append('maxpressure', pump.maxpressure.toString());
    pumpData.append('liquidtemperature', pump.liquidtemperature.toString());
    pumpData.append('weight', pump.weight.toString());
    pumpData.append('imagename', '');
    pumpData.append('image', '');
    pumpData.append('price', pump.price.toString());
    pumpData.append('motorid', pump.motorid.toString());
    pumpData.append('framematerialid', pump.framematerialid.toString());
    pumpData.append('wheelmaterialid', pump.wheelmaterialid.toString());
    pumpData.append('description', pump.description);
    pumpData.append('file', pump.file);
    console.log(pumpData.getAll('name'));
    this.webService.UpdateConcretePump(this.pump!.id, pumpData);
  }

  constructor(private route: ActivatedRoute) {
  }

  public pump?: IPump;
  private webService = inject(WebService);
  private pumpId: string = '0';
  private fileToUpload ?: File;

  private route$?: Subscription;
  private pump$?: Subscription;

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe((params) => {
      this.pumpId = params['id'];
    });
    this.pump$ = this.webService.pumps$.subscribe((pumps) => {
      this.pump = pumps.find((x) => x.id === this.pumpId);
    });
    if (!this.pump) return;
    this.pump.image = this.ByteArrayToImg(this.pump.image);
    this.pumpsForm = new FormGroup({
      id: new FormControl(this.pump, [Validators.required]),
      name: new FormControl(this.pump.name, [Validators.required]),
      maxpressure: new FormControl(this.pump.maxpressure, [Validators.required]),
      liquidtemperature: new FormControl(this.pump.liquidtemperature, [Validators.required]),
      weight: new FormControl(this.pump.weight, [Validators.required]),
      imagename: new FormControl(this.pump.imagename, [Validators.required]),
      image: new FormControl(this.pump.image, [Validators.required]),
      price: new FormControl(this.pump.price, [Validators.required]),
      motorid: new FormControl(this.pump.motorid, [Validators.required]),
      framematerialid: new FormControl(this.pump.framematerialid, [Validators.required]),
      wheelmaterialid: new FormControl(this.pump.wheelmaterialid, [Validators.required]),
      description: new FormControl(this.pump.description, [Validators.required]),
      file: new FormControl(this.ByteArrayToFile(this.pump.image, this.pump.imagename)),
    })
  }

  public ByteArrayToImg(array: string) {
    return 'data:image/jpeg;base64,' + array;
  }
  public ByteArrayToFile(array: string, filename : string) {
    return new File([this.ByteArrayToImg(array)], filename, {type: 'image/jpeg'});
  }

  public fileSelected(event: any) {
    let file: File = event.target.files[0];
    if (
      file.type !== 'image/jpeg'
    ) {
      alert('Пожалуйста, выберите картинку (.jpg)');
      return;
    }
    this.toBase64(file).then(base64 => {
      this.pumpsForm!.get('file')?.setValue(file);
      this.pump!.image = base64;
    });
  }

  private toBase64(file: File): Promise<string> {
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

  get _image() {
    return this.pumpsForm?.get('image');
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


