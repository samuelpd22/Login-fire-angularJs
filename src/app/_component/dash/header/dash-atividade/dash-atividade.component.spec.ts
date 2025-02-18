import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAtividadeComponent } from './dash-atividade.component';

describe('DashAtividadeComponent', () => {
  let component: DashAtividadeComponent;
  let fixture: ComponentFixture<DashAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashAtividadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
