import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProfileListComponent } from './school-profile-list.component';

describe('SchoolProfileListComponent', () => {
  let component: SchoolProfileListComponent;
  let fixture: ComponentFixture<SchoolProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolProfileListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
