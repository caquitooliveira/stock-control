import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarNavigationComponentComponent } from './toolbar-navigation-component.component';

describe('ToolbarNavigationComponentComponent', () => {
  let component: ToolbarNavigationComponentComponent;
  let fixture: ComponentFixture<ToolbarNavigationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarNavigationComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarNavigationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
