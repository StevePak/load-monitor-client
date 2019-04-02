import { AlertService } from './alert.service';

describe('AlertService', () => {
  let toastrService: {
    clear: jasmine.Spy;
    success: jasmine.Spy;
    error: jasmine.Spy;
  };
  let alertService: AlertService;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj('ToastrService', [
      'clear',
      'success',
      'error'
    ]);
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    alertService = new AlertService(<any> toastrService);
  });

  it('should create service with empty messages', () => {
    expect(alertService.messages).not.toBeNull();
    expect(alertService.messages.length).toBe(0);
  });

  it('should call toastr.clear and toastr.success on showSuccess', () => {
    alertService.showSuccess('title', 'message');

    expect(toastrService.clear.calls.count()).toBe(1);
    expect(toastrService.success.calls.count()).toBe(1);
  });

  it('should add message on showSuccess', () => {
    alertService.showSuccess('title', 'message');

    expect(alertService.messages.length).toBe(1);
  });

  it('should add 5 messages on showSuccess x5', () => {
    for (let i = 0; i < 5; i++) {
      alertService.showSuccess('title', 'message');
    }

    expect(alertService.messages.length).toBe(5);
  });

  it('should call toastr.clear and toastr.error on showError', () => {
    alertService.showError('title', 'message');

    expect(toastrService.clear.calls.count()).toBe(1);
    expect(toastrService.error.calls.count()).toBe(1);
  });

  it('should add message on showError', () => {
    alertService.showError('title', 'message');

    expect(alertService.messages.length).toBe(1);
  });

  it('should add 5 messages on showError x5', () => {
    for (let i = 0; i < 5; i++) {
      alertService.showError('title', 'message');
    }

    expect(alertService.messages.length).toBe(5);
  });

  it('should get 0 messages on create', () => {
    alertService.getMessages().subscribe(messages => {
      expect(messages.length).toBe(0);
    });
  });

  it('should get 1 messages on showSuccess', () => {
    alertService.showSuccess('title', 'message');

    alertService.getMessages().subscribe(messages => {
      expect(messages.length).toBe(1);
    });
  });

  it('should get 1 messages on showError', () => {
    alertService.showError('title', 'message');

    alertService.getMessages().subscribe(messages => {
      expect(messages.length).toBe(1);
    });
  });

  it('should get 5 messages on showSuccess x5', () => {
    for (let i = 0; i < 5; i++) {
      alertService.showSuccess('title', 'message');
    }

    alertService.getMessages().subscribe(messages => {
      expect(messages.length).toBe(5);
    });
  });

  it('should get 5 messages on showError x5', () => {
    for (let i = 0; i < 5; i++) {
      alertService.showError('title', 'message');
    }

    alertService.getMessages().subscribe(messages => {
      expect(messages.length).toBe(5);
    });
  });
});
