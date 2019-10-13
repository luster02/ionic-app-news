import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesModalPage } from './detalles-modal.page';

describe('DetallesModalPage', () => {
  let component: DetallesModalPage;
  let fixture: ComponentFixture<DetallesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
