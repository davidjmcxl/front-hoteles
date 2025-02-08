import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHotelDialogComponent } from './agregar-hotel-dialog.component';

describe('AgregarHotelDialogComponent', () => {
  let component: AgregarHotelDialogComponent;
  let fixture: ComponentFixture<AgregarHotelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarHotelDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHotelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
