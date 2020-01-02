import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Category } from 'src/app/common/models/category.model';
import { Observable } from 'rxjs';
import { RandomImage } from 'src/app/common/models/randomImage.model';
import { finalize } from 'rxjs/operators';
import { RandomImageService } from 'src/app/common/services/random-image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  randomImageAddForm: FormGroup;
  randomImage: RandomImage;
  fileData: File = null;
  previewUrl: any = null;
  storageRef: AngularFireStorageReference;
  storageTask: AngularFireUploadTask;
  bufferValue = 0;
  visible = true;
  selectable = true;



  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage,
    private randomImageService: RandomImageService

  ) { }

  ngOnInit() {
    this.randomImageAddForm = this.fb.group({

      imageUrl: [""],
    });

  }






  fileProgress(fileInput: any) {
    console.log(".........fileInput", fileInput);
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }
  getImageDetail() {
    let domain: RandomImage = {

    };
    domain.imageUrl = this.previewUrl;
    return domain;
  }
  saveDomain() {
    console.log("save image", this.randomImage);
    let image: RandomImage = this.getImageDetail();
    console.log("save image", image);
    if (this.fileData) {
      const originalName: string = this.fileData.name;
      const lastDot = originalName.lastIndexOf(".");
      const ext = originalName.substring(lastDot + 1);

      var filename = image.name + "_" + originalName + "." + ext;
      var filePath = "/random-images/" + filename;

      if (ext == "jpg" || ext == "png") {
        this.storageRef = this.storage.ref(filePath);
        this.storageTask = this.storageRef.put(this.fileData);
        this.storageTask.percentageChanges().subscribe(value => {
          this.bufferValue = value;
          // console.log("bufferValue:", this.bufferValue);
        });
        this.storageTask
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.storageRef.getDownloadURL().subscribe(url => {
                console.log(url);

                image.imageUrl = url;

                this.setRandomImage(image);
              });
            })
          )
          .subscribe();
      }
    } else {
      this.setRandomImage(image);
    }

    this.dialogRef.close();
  }
  setRandomImage(image) {
    this.randomImageService.addRandomImage(image);

  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
