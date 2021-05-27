import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPlatformComponent } from './sidebar-platform.component';

describe('SidebarPlatformComponent', () => {
  let component: SidebarPlatformComponent;
  let fixture: ComponentFixture<SidebarPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
