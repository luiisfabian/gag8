import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas:boolean = true;

  // posts: Observable<any[]>;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private _cap: CargaArchivoProvider, public socialSharing:SocialSharing) {
    // this.posts = afDB.list('post').valueChanges();
  }

  mostrar_modal(){
  let modal= this.modalCtrl.create(SubirPage);
  modal.present();
}
  compartir(post:any){
    this.socialSharing.shareViaFacebook(post.titulo, post.img, post.url).then(() => {
      //success
      console.log("se compartio correctamente");
      }).catch((error) => {
      // Error!
      console.log(JSON.stringify(error));
    });
  }
doInfinite(infiniteScroll) {
  console.log('Begin async operation');
    this._cap.cargar_imagenes().then((mas:boolean)=>{
      console.log(mas);
      this.hayMas = mas;

    infiniteScroll.complete();

    })
}
}
