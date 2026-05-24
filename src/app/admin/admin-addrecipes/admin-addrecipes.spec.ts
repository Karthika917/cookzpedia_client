import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddrecipes } from './admin-addrecipes';

describe('AdminAddrecipes', () => {
  let component: AdminAddrecipes;
  let fixture: ComponentFixture<AdminAddrecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddrecipes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddrecipes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
