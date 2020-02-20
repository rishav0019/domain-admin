// // "@angular/material": "^8.2.3",
import { DomainService } from "./../../common/services/domain.service";
import { Domain } from "./../../common/models/domain.model";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize, startWith, map } from "rxjs/operators";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  MatChipInputEvent,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatDialog
} from "@angular/material";
import { Category } from 'src/app/common/models/category.model';
import { CategoryService } from 'src/app/common/services/category.service';
import { Observable } from 'rxjs';
import { RandomImageService } from 'src/app/common/services/random-image.service';
import { TemplateGeneratorService } from 'src/app/common/services/template-generator.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

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
  domain: Domain;

  fileData: File = null;
  previewUrl: any = null;
  storageRef: AngularFireStorageReference;
  storageTask: AngularFireUploadTask;
  bufferValue = 0;
  categories: Category[] = [];
  selectedCategories: Category[] = []; //[{name:"common"}];
  filteredCategories: Observable<Category[]>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  paymentType: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keyWords = ["common"];

  width: number;
  height: number;
  window_url = window.URL || window.webkitURL;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DomainAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage,
    private domainService: DomainService,
    private categoryService: CategoryService,
    private randomImageService: RandomImageService,
    private templateGeneratorService: TemplateGeneratorService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.domainAddForm = this.fb.group({
      name: ["", Validators.required],
      extension: ["", Validators.required],
      description: [""],
      keyWord: [""],
      imageUrl: [""],
      price: [""],
      salePrice: ["", Validators.required],
      category: ["", Validators.required],
      featured: [false],
      isSold: [false],
      isDeactive: [false]
    });

    if (this.data.domain) {
      this.domainId = this.data.domain.id;
      if (this.domainId) {
        // console.log("...........domainId", this.domainId);
        this.domain = this.data.domain;
        this.populateDomain(this.data.domain);
      } else {

        // this.getRandomImage();

      }
    }
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;

      // console.log();

      this.filteredCategories = this.domainAddForm.get("category").valueChanges.pipe(
        startWith(""),
        map(value => this._categoryFilter(value))
      );

    })

  }

  getRandomImage() {
    let randomImages = [];
    let imageNos = 0;
    let randomIndex;

    this.randomImageService.getRandomImages().subscribe(response => {
      randomImages = response;
      imageNos = randomImages.length;

      randomIndex = Math.floor(Math.random() * imageNos) + 0;

      this.previewUrl = randomImages[randomIndex].imageUrl;
    })
  }
  private _categoryFilter(value: string): Category[] {


    if (typeof value == "string") {

      const filterValue = value.toLowerCase();
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(filterValue)
      );
    } else {
      this.addCategories(value);
    }
  }
  updatePaymentStatus(payment) {
    console.log('updatePaymentStatus', payment)
  }
  addCategories(category: Category) {

    this.selectedCategories.push(category);
    this.domainAddForm.patchValue({
      category: ""
    })

  }
  removeCategory(category) {
    let index = this.selectedCategories.findIndex(data => data == category);

    this.selectedCategories.splice(index, 1);
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

    const img = new Image();
    img.src = this.window_url.createObjectURL(this.fileData);

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {

      setTimeout(() => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;


        window.URL.revokeObjectURL(img.src);


        console.log("Image Width:", width);
        console.log("Image Height:", height);

        if (width <= 200) {
          this.previewUrl = reader.result;
        } else {
          alert("Image Width should be less than 200px.");
          this.previewUrl = "";
        }


      }, 2000);



    };
  }


  randomColorGenerator() {
    let color = ['#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#5c6bc0', '#2196f3', '#039be5', '#0097a7', '#26a69a', '#43a047', '#689f38', '#ef6c00', '#ff5722'];
    return color[Math.floor(Math.random() * 13)];
  }

  randomFontGenerator() {
    let fontType = ['BioRhyme', 'Roboto', 'Calistoga', 'Lato', 'Playfair Display'];
    return fontType[Math.floor(Math.random() * 5)];
  }



  getDomainDetail() {
    let domain: Domain = {
      name: this.domainAddForm.get("name").value,
      extension: this.domainAddForm.get("extension").value,
      description: this.domainAddForm.get("description").value,
      price: this.domainAddForm.get("price").value,
      salePrice: this.domainAddForm.get("salePrice").value,
      isFeatured: this.domainAddForm.get("featured").value,
      isSold: this.domainAddForm.get("isSold").value,
      isDeactive: this.domainAddForm.get("isDeactive").value,
      color: this.randomColorGenerator(),
      font: this.randomFontGenerator()
    };
    domain.category = this.selectedCategories,
      domain.imageUrl = this.previewUrl;
    domain.keyWords = this.keyWords;

    return domain;
  }
  saveDomain() {
    // console.log("save domain");
    let domain: Domain = this.getDomainDetail();
    // console.log("save domain", domain);
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
          // console.log("bufferValue:", this.bufferValue);
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


  setDomain(domain) {
    if (this.domainId) {
      // console.log("updste domain", domain);
      domain.id = this.domainId;
      this.domainService.updateDomain(domain);
      this.snackBar.open(domain.name + ' updated !!', '', {
        duration: 2500
      });
    } else {
      this.domainService.addDomain(domain);
      this.snackBar.open(domain.name + ' added to the list !!', '', {
        duration: 2500
      });
    }
  }

  // deactivateDomain() {

  //   let domain: Domain = this.getDomainDetail();
  //   domain.isDeactive = true;
  //   domain.id = this.domainId;

  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: "300px",
  //     data: {
  //       message: "Are you sure to delete this Domain?",
  //       heading: "Delete Domain"
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(response => {
  //     this.domainService.updateDomain(domain);
  //     this.onCancelClick();
  //   });
  // }

  // fetchDomainById(id) {
  //   this.domainService.getDomainById(id).subscribe(response => {
  //     this.populateDomain(response);
  //   });
  // }

  populateDomain(domain: Domain) {
    this.domainAddForm.patchValue({
      name: domain.name,
      extension: domain.extension,
      description: domain.description,
      price: domain.price,
      salePrice: domain.salePrice,
      featured: domain.isFeatured,
      isSold: domain.isSold,
      isDeactive: domain.isDeactive
    });
    this.selectedCategories = domain.category;
    this.keyWords = domain.keyWords;
    this.previewUrl = domain.imageUrl;
  }

  generateTemplate() {
    this.templateGeneratorService.getTemplate(this.domain);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
