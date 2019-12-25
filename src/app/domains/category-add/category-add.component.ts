import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomainAddComponent } from '../domain-add/domain-add.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category } from 'src/app/common/models/category.model';
import { CategoryService } from 'src/app/common/services/category.service';
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  categoryForm: FormGroup;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categories: Category[];
  
  categoryId:string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,    
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {

    this.categoryForm = this.fb.group({
      name: ["",Validators.required],
    });
   this.getCategories();
  }
  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    
    // if ((value || "").trim()) {
    //   this.categories.push(value.trim());
    // }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(category): void {
    console.log(".................category",category)
    this.categoryService.deleteCategory(category);
    // const index = this.catories.indexOf(category);
    // if (index >= 0) {
    //   this.categories.splice(index, 1);
    // }
  }
  editChips(category){
    this.categoryId=category;
    this.populateCategory(category);
    if(category){
      // this.categoryService.getCategoryById
    }
    console.log(".................editChips",category);
  }

 getCategories(){
  this.categoryService.getCategories().subscribe(response => {
    this.categories= response;
    console.log("getCategories()=>categories",response)
 })
}
  getcategoryDetails() {
    let category: Category = {
      name: this.categoryForm.get("name").value
    }
    return category;
}
saveCategory(){
  let cactegory = this.getcategoryDetails();


    this.categoryService.addCategory(cactegory).then(()=>{
      console.log("Category Added");
     // this.dialogRef.close();
    })
  }
  onNoClick(){
    this.dialogRef.close();
  }
  populateCategory(category: Category) {
    this.categoryForm.patchValue({
      name: category.name,
    });
  }
}
