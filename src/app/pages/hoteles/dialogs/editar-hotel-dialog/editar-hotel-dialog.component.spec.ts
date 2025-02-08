import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHotelDialogComponent } from './editar-hotel-dialog.component';

describe('EditarHotelDialogComponent', () => {
  let component: EditarHotelDialogComponent;
  let fixture: ComponentFixture<EditarHotelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarHotelDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHotelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
