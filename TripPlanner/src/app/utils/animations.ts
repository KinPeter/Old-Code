import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations'

export interface AnimationTimings {
  in: string
  out: string
}

export function fadeAnimation(timings: AnimationTimings): AnimationTriggerMetadata {
  return trigger('fade', [
    transition('void => *', [style({ opacity: 0 }), animate(timings.in, style({ opacity: 1 }))]),
    transition('* => void', [animate(timings.out, style({ opacity: 0 }))])
  ])
}
