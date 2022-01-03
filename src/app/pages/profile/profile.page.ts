import { ProfilePhotoOptionPage } from './../profile-photo-option/profile-photo-option.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  photo = "https://i.pravatar.cc/150";
  constructor(private modalController: ModalController) {
  }
  ngOnInit() { }
  async openOptionSelection() {
    const modal = await this.modalController.create({
      component: ProfilePhotoOptionPage,
      cssClass: "transparent-modal"
    });
    modal.onDidDismiss()
      .then(res => {
        console.log(res);
        if (res.role !== 'backdrop') {
          this.takePicture(res.data);
        }
      });
    return await modal.present();
  }
  async takePicture(type) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource[type]
    });
    this.photo = image.webPath;
  }

}
