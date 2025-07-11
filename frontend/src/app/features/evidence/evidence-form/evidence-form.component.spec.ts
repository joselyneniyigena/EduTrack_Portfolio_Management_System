import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceFormComponent } from './evidence-form.component';

describe('EvidenceFormComponent', () => {
  let component: EvidenceFormComponent;
  let fixture: ComponentFixture<EvidenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidenceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
