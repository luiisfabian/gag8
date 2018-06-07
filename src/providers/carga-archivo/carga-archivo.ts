import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import 'rxjs/add/operator/map';

import { ToastController } from 'ionic-angular';
// import { dateDataSortValue } from 'ionic-angular/util/datetime-util';
/*
  Generated class for the CargaArchivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargaArchivoProvider {
  imagenes :  ArchivoSubir[] = [];
  lastKey: string = null;
  constructor(public http: HttpClient, public toastCtrl: ToastController, public afDB: AngularFireDatabase) {
    this.cargar_ultimo_key().subscribe(()=>{
      this.cargar_imagenes();
    });
  }

  private cargar_ultimo_key(){
   return  this.afDB.list('/post',ref=> ref.orderByKey().limitToLast(1))
    .valueChanges()
    .map((posts:any) => {
      console.log(posts);
    this.lastKey = posts[0].key;
    this.imagenes.push(posts[0]);
    });
  }
  cargar_imagenes(){
    return  new Promise((resolve, reject)=>{
    this.afDB.list('/post',ref=> ref.limitToLast(4).orderByKey().endAt(this.lastKey))
    .valueChanges().subscribe((posts:any) =>
    {
      posts.pop();
      if (posts.length == 0) {
        console.log("imagen ya fue cargada");
        resolve(false);
        return;
      }
      this.lastKey = posts[0].key;

      for( let i = posts.length-1;  i >=0; i-- ){
        let post = posts[i];
        this.imagenes.push(post);
      }
      resolve(true);
    });
    });
}

  cargar_imagen_firebase(archivo: ArchivoSubir){
    let promesa = new Promise((resolve, reject )=>{
      this.mostrarToast('Cargando...');
      //crearle nombre del archivo para subirlo a firebase
      let storeRefire= firebase.storage().ref();
       let nombreArchivo:string = new Date().valueOf().toString();
     // let nombreArchivo:string = "letrass";
     this.mostrarToast(nombreArchivo);

      //subir la imagen a firebase
      let updateTask : firebase.storage.UploadTask=
      storeRefire.child(`img/${nombreArchivo}.jpg`)
      .putString(archivo.img, 'base64', { contentType: 'image/jpeg'});

      updateTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{}, //Saber el porcentaje de cuantos megabyts se han subido
        (error) =>{
          console.log("ERROR EN LA CARGA");
          console.log( 'ERROR: ' + JSON.stringify(error) );
          console.log(JSON.stringify(error));
          this.mostrarToast(JSON.stringify(error));
          reject();
        },
        () =>{
          //cuanto todo sube bien
          console.log("ARCHIVO SUBIDO");
          this.mostrarToast('Imagen Cargada Correctamente');
          //Obetener el Url
          let url = updateTask.snapshot.downloadURL
          this.crear_post(archivo.titulo, url, nombreArchivo);
          resolve();
        }
      );
    });
    return promesa;
  }

  crear_post(titulo: string, url:string, nombreArchivo:string ){
    let post: ArchivoSubir={
      img: url,
      titulo: titulo,
      key: nombreArchivo
    }
    console.log(JSON.stringify(post));

    this.afDB.object(`/post/${nombreArchivo}.jpg`).update(post);
    this.imagenes.push(post);
  }

  mostrarToast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    }).present();

  }

}

interface ArchivoSubir{
  titulo: string,
  img: string,
  key?: string,
}
