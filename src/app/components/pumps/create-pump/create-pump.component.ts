import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {WebService} from "../../../services/web.service";

@Component({
  selector: 'app-create-pump',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-pump.component.html',
  styleUrl: './create-pump.component.scss'
})
export class CreatePumpComponent implements OnInit {
  public createPumpForm ?: FormGroup;
  private webService = inject(WebService);
  public img ?: string;
  submitForm() {
    let pump = this.createPumpForm?.value;
    let pumpData = new FormData();
    pumpData.append('name', pump.name);
    pumpData.append('id', pump.id);
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
    this.webService.CreatePump(pumpData);
  }



  ngOnInit(): void {

    this.createPumpForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      maxpressure: new FormControl<number | null>( null, [Validators.required]),
      liquidtemperature: new FormControl<number| null>( null, [Validators.required]),
      weight: new FormControl<number| null>( null, [Validators.required]),
      price: new FormControl<number| null>( null,[Validators.required]),
      motorid: new FormControl<string>('6ecd8c99-4036-403d-bf84-cf8400f67837', [Validators.required]),
      framematerialid: new FormControl<string>('6ecd8c99-4036-403d-bf84-cf8400f67836', [Validators.required]),
      wheelmaterialid: new FormControl<string>('0ecd8c99-4036-403d-bf84-cf8400f67836', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
      file: new FormControl<File | null>( null, [Validators.required]),
    })
  }
  get _name() {
    return this.createPumpForm?.get('name');
  }
  get _framematerialid(){
    return this.createPumpForm?.get('framematerialid');
  }
  get _motorid(){
    return this.createPumpForm?.get('motorid');
  }
  get _wheelmaterialid(){
    return this.createPumpForm?.get('wheelmaterialid');
  }
  get _maxpressure() {
    return this.createPumpForm?.get('maxpressure');
  }

  get _liquidtemperature() {
    return this.createPumpForm?.get('liquidtemperature');
  }

  get _weight() {
    return this.createPumpForm?.get('weight');
  }

  get _price() {
    return this.createPumpForm?.get('price');
  }

  get _description() {
    return this.createPumpForm?.get('description');
  }
  public fileSelected(event: any) {
    let file: File = event.target.files[0];
    if (
      file.type !== 'image/jpeg'
    ) {
      alert('Пожалуйста, выберите картинку (.jpg)');
      return;
    }
      this.createPumpForm!.get('file')!.setValue(file);
      this.toBase64(file).then((res) => this.img = res);
  }
  public toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

}
