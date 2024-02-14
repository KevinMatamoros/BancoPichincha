import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ViewContainerRef } from '@angular/core';

import { ModalService } from './modal.service';
import { ModalComponent } from '@atoms';

describe('ModalService', () => {
  let modalService: ModalService;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let componentSubscriberMock: jasmine.SpyObj<Subject<string>>;

  let modalComponentFixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    const modalComponentMock = {
      instance: {
        title: '',
        closeMeEvent: new Subject<void>(),
        confirmEvent: new Subject<void>()
      },
      destroy: jasmine.createSpy()
    };


    TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        ModalService
      ]
    });

    modalComponentFixture = TestBed.createComponent(ModalComponent);
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createComponent']);
    viewContainerRefMock.createComponent.and.returnValue(modalComponentFixture.componentRef);

    modalService = TestBed.inject(ModalService);
    componentSubscriberMock = jasmine.createSpyObj('modalService', ['createComponent']);

  });

  it('should create the service', () => {
    expect(modalService).toBeTruthy();
  });

  it('should open and close the modal', () => {
    const modalTitle = 'Test Modal';

    const modalSubscriber = modalService.openModal(viewContainerRefMock, modalTitle);

    modalService.confirm();
    modalService.closeModal();

    modalSubscriber.subscribe((result) => {
      expect(result).toBe('confirm');
    });

    expect(viewContainerRefMock.createComponent).toHaveBeenCalled();
  });

  it('should close modal and complete subscriber on closeModal', () => {
    // Abrir modal
    const modalTitle = 'Test Modal';
    const subscription = modalService.openModal(viewContainerRefMock, modalTitle);

    // Cerrar modal
    modalService.closeModal();

    // Verificar que el subscriber se haya completado y el modal se haya destruido
    expect(subscription).toBeTruthy(); // Puedes realizar más verificaciones específicas según tus necesidades

    expect(modalService['componentSubscriber'].isStopped).toBeTruthy();
    expect(modalService['componentRef']).toBeTruthy();
  });

});
