import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { saveNN } from './firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore"; 

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponentComponent implements OnInit {

  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: "AIzaSyAP8lq5D-_QlERLAJ9ywtOw0-fZGgl29F4",
    authDomain: "name-17a27.firebaseapp.com",
    projectId: "name-17a27",
    storageBucket: "name-17a27.appspot.com",
    messagingSenderId: "589992208601",
    appId: "1:589992208601:web:1925ef9f59cf2a8d38b6c8"
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(this.app);

  checkoutForm = this.formBuilder.group({
    name: '',
  });

  constructor( 
    private formBuilder: FormBuilder, 
  ) { }

  async ngOnInit(): Promise<void> { 
  }

  //Método para visualizar nomes em um documento 
  async getNames() {
    let querySnapshot = await getDocs(collection(this.db, "names"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  //Método para salvar nomes em um documento 
  async saveNames(userInput: string) {
    try {
      const docRef = await addDoc(collection(this.db, "names"), {
        name: userInput,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  onSubmit(): void {
    let auxName: any = this.checkoutForm.value.name;
    auxName===null || auxName===undefined || auxName==="" ?  this.getNames() : this.saveNames(auxName);
    console.warn('Your order has been submitted', this.checkoutForm.value.name);
    this.checkoutForm.reset();
  }
}
