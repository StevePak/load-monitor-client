
import { ServerLoadService } from './server-load.service';
import { asyncData } from '../test/test-helper';

describe('ServerLoadService', () => {
    let alertService: { showError: jasmine.Spy, showSuccess: jasmine.Spy };
    let socketService: { on: jasmine.Spy, fromEvent: jasmine.Spy };
    let serverLoadService: ServerLoadService;

    const fakeUrl = 'http://localhost:4114';

    beforeEach(() => {
        alertService = jasmine.createSpyObj('AlertService', ['showError', 'showSuccess']);
        socketService = jasmine.createSpyObj('Socket', ['on', 'fromEvent']);

        // tslint:disable-next-line: no-angle-bracket-type-assertion
        serverLoadService = new ServerLoadService(<any>socketService, <any>alertService);
        jasmine.clock().install();
        jasmine.clock().mockDate();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should get call socket.on on constructor', () => {
        expect(socketService.on.calls.count()).toBe(1);
    });

    it('should get server load', () => {
        const expectedLoad = 0.75;

        socketService.fromEvent.and.returnValue(asyncData(expectedLoad));

        serverLoadService.getLoadAverage().subscribe(data => {
            expect(data).toBe(.75);
        });

        expect(socketService.fromEvent.calls.count()).toBe(1);
    });

    it('should overload on high load if not overloaded', () => {
        expect(serverLoadService.overload).toBeNull();

        serverLoadService.handleNewCpuLoad(1.25);

        expect(serverLoadService.overload).toEqual(new Date(new Date().getTime() + 120000));
        expect(alertService.showError.calls.count()).toBe(1);
        expect(alertService.showSuccess.calls.count()).toBe(0);
    });

    it('should not overload if overloaded', () => {
        serverLoadService.handleNewCpuLoad(1.25);

        expect(serverLoadService.overload).toEqual(new Date(new Date().getTime() + 120000));

        jasmine.clock().tick(60000);

        serverLoadService.handleNewCpuLoad(1.25);

        expect(serverLoadService.overload).not.toEqual(new Date(new Date().getTime() + 120000));

        expect(alertService.showError.calls.count()).toBe(1);
        expect(alertService.showSuccess.calls.count()).toBe(0);
    });

    it('should overload if overload expired', () => {
        serverLoadService.handleNewCpuLoad(1.25);

        jasmine.clock().tick(121000);

        serverLoadService.handleNewCpuLoad(1.25);

        expect(serverLoadService.overload).toEqual(new Date(new Date().getTime() + 120000));

        expect(alertService.showError.calls.count()).toBe(2);
        expect(alertService.showSuccess.calls.count()).toBe(0);
    });

    it('should recover on low load if overloaded', () => {
        serverLoadService.handleNewCpuLoad(1.25);

        jasmine.clock().tick(60000);

        serverLoadService.handleNewCpuLoad(0.75);

        expect(alertService.showError.calls.count()).toBe(1);
        expect(alertService.showSuccess.calls.count()).toBe(1);
        expect(Number(serverLoadService.overload)).toBeLessThanOrEqual(Number(new Date()));
    });

    it('should not recover on low load if not overloaded', () => {
        serverLoadService.handleNewCpuLoad(0.75);

        expect(alertService.showSuccess.calls.count()).toBe(0);
    });

    it('should not recover on low load if overload expired', () => {
        serverLoadService.handleNewCpuLoad(1.25);

        jasmine.clock().tick(121000);

        serverLoadService.handleNewCpuLoad(0.75);

        expect(alertService.showError.calls.count()).toBe(1);
        expect(alertService.showSuccess.calls.count()).toBe(0);
    });
});
