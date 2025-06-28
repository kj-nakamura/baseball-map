import { vi } from 'vitest';

// Google Maps APIのモック
global.google = {
    maps: {
        Map: vi.fn().mockImplementation(() => ({
            setCenter: vi.fn(),
            setZoom: vi.fn(),
            fitBounds: vi.fn(),
            addListener: vi.fn()
        })),
        Marker: vi.fn().mockImplementation(() => ({
            setMap: vi.fn(),
            addListener: vi.fn(),
            setAnimation: vi.fn()
        })),
        InfoWindow: vi.fn().mockImplementation(() => ({
            setContent: vi.fn(),
            open: vi.fn(),
            close: vi.fn()
        })),
        LatLngBounds: vi.fn().mockImplementation(() => ({})),
        LatLng: vi.fn().mockImplementation((lat, lng) => ({ lat, lng })),
        event: {
            trigger: vi.fn()
        },
        Animation: {
            DROP: 'DROP',
            BOUNCE: 'BOUNCE'
        },
        SymbolPath: {
            CIRCLE: 'CIRCLE',
            FORWARD_CLOSED_ARROW: 'FORWARD_CLOSED_ARROW'
        }
    }
};



// window.innerWidthのモック
Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
});

// window.innerHeightのモック
Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 768,
});

// ResizeObserverのモック
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// IntersectionObserverのモック
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));