import { DomainService } from "./../../common/services/domain.service";
import { Domain } from "./../../common/models/domain.model";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { finalize } from "rxjs/operators";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  MatChipInputEvent,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";

// export interface Fruit {
//   name: string;
// }

@Component({
  selector: "app-domain-add",
  templateUrl: "./domain-add.component.html",
  styleUrls: ["./domain-add.component.scss"]
})
export class DomainAddComponent implements OnInit {
  domainAddForm: FormGroup;
  domainId: string;
  fileData: File = null;
  previewUrl: any = null;
  storageRef: AngularFireStorageReference;
  storageTask: AngularFireUploadTask;
  bufferValue = 0;
  // keyword
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keyWords = []; //= [{ name: "Lemon" }, { name: "Lime" }, { name: "Apple" }];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DomainAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage,
    private domainService: DomainService
  ) {}

  ngOnInit() {
    this.domainAddForm = this.fb.group({
      domainName: [""],
      description: [""],
      keyWord: [""],
      imageUrl: [""]
    });
    if (this.data.domain) {
      this.domainId = this.data.domain.id;
      if (this.domainId) {
        console.log("...........domainId", this.domainId);
        this.populateDomain(this.data.domain);
      }
    }
  }

  //keyword add
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.keyWords.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(key): void {
    const index = this.keyWords.indexOf(key);
    // const index = this.keyWords.findIndex(data => (data.id = key.id));

    if (index >= 0) {
      this.keyWords.splice(index, 1);
    }
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
  getDomainDetail() {
    let domain: Domain = {
      name: this.domainAddForm.get("domainName").value,
      description: this.domainAddForm.get("description").value
    };

    domain.imageUrl = this.previewUrl;
    domain.keyWords = this.keyWords;

    return domain;
  }
  saveDomain() {
    // console.log("save domain");
    let domain: Domain = this.getDomainDetail();
    console.log("save domain", domain);
    if (this.fileData) {
      const originalName: string = this.fileData.name;
      const lastDot = originalName.lastIndexOf(".");
      const ext = originalName.substring(lastDot + 1);

      var filename = domain.name + "_" + originalName + "." + ext;
      var filePath = filename;

      if (ext == "jpg" || ext == "png") {
        this.storageRef = this.storage.ref(filePath);
        this.storageTask = this.storageRef.put(this.fileData);
        this.storageTask.percentageChanges().subscribe(value => {
          this.bufferValue = value;
          console.log("bufferValue:", this.bufferValue);
        });
        this.storageTask
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.storageRef.getDownloadURL().subscribe(url => {
                console.log(url);

                domain.imageUrl = url;

                this.setDomain(domain);
              });
            })
          )
          .subscribe();
      }
    } else {
      this.setDomain(domain);
    }

    this.dialogRef.close();
  }

  // uploadImage(file) {
  //   let domain: Domain = {
  //     name: this.domainAddForm.get("domainName").value,
  //     keyWord: this.keyWords,
  //     description: this.domainAddForm.get("description").value
  //   };
  //   console.log(domain, "......................");
  //   const originalName: string = file.name;
  //   const lastDot = originalName.lastIndexOf(".");
  //   const ext = originalName.substring(lastDot + 1);

  //   var filename = domain.name + "_" + originalName + "." + ext;
  //   var filePath = filename;

  //   if (ext == "jpg" || ext == "png") {
  //     this.storageRef = this.storage.ref(filePath);
  //     this.storageTask = this.storageRef.put(file);
  //     this.storageTask.percentageChanges().subscribe(value => {
  //       this.bufferValue = value;
  //       //  console.log("bufferValue:", this.bufferValue);
  //     });
  //     this.storageTask
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           this.storageRef.getDownloadURL().subscribe(url => {
  //             console.log(url);

  //             domain.imageUrl = url;

  //             this.setDomain(domain);
  //           });
  //         })
  //       )
  //       .subscribe();
  //   }
  // }

  setDomain(domain) {
    if (this.domainId) {
      console.log("updste domain", domain);
      domain.id = this.domainId;
      this.domainService.updateDomain(domain);
    } else {
      this.domainService.addDomain(domain);
    }
  }

  // fetchDomainById(id) {
  //   this.domainService.getDomainById(id).subscribe(response => {
  //     this.populateDomain(response);
  //   });
  // }

  populateDomain(domain: Domain) {
    this.domainAddForm.patchValue({
      domainName: domain.name,
      description: domain.description
    });

    this.keyWords = domain.keyWords;
    this.previewUrl = domain.imageUrl;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
