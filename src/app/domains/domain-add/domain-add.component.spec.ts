import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainAddComponent } from './domain-add.component';

describe('DomainAddComponent', () => {
  let component: DomainAddComponent;
  let fixture: ComponentFixture<DomainAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
