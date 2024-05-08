import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConfigurationComponent } from './list-configuration.component';

describe('ListConfigurationComponent', () => {
  let component: ListConfigurationComponent;
  let fixture: ComponentFixture<ListConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
