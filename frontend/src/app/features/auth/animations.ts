import { trigger, state, style, transition, animate } from '@angular/animations';

export const authAnimations = [
    trigger('slideIn', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateX(50px)' }),
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
            animate('0.4s ease-in', style({ opacity: 0, transform: 'translateX(-50px)' }))
        ])
    ]),

    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('0.4s ease-out', style({ opacity: 1 }))
        ])
    ])
];