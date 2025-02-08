import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarHabitacionesDialogComponent } from './asignar-habitaciones-dialog.component';

describe('AsignarHabitacionesDialogComponent', () => {
  let component: AsignarHabitacionesDialogComponent;
  let fixture: ComponentFixture<AsignarHabitacionesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarHabitacionesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarHabitacionesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
