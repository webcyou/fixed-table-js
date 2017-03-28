/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

namespace FixedTables {

  interface support {
    touch: boolean;
  }

  interface vendor {
    animationend: string;
    defaultEvent: string;
    transitionend: string;
    prefix: string;
    transform: string;
  }

  /**
   * Utility Class
   * @public
   * @param option
   */
  export class Utility {
    private support: support;
    public vendor: vendor;
    constructor(
      ) {
      this.support = {
        touch: ('ontouchstart' in window)
      };
      this.vendor = {
        defaultEvent: 'click',
        transitionend: this.whichTransitionEvent(),
        animationend: this.whichAnimationEvent(),
        prefix: this.whichPrefix(),
        transform: this.whichTransform()
      };
      if (this.support.touch) {
        this.vendor.defaultEvent = 'touchend';
      }
    }

    public whichPrefix() {
      return (/webkit/i).test(navigator.appVersion) ? '-webkit-' : (/firefox/i).test(navigator.userAgent) ? '-moz-' :
        (/trident/i).test(navigator.userAgent) ? '-ms-' : 'opera' in window ? '-o-' : '';
    }

    public whichTransform() {
      let t, el = document.createElement('fakeelement');
      let transform = {
        'transform': 'transform',
        'OTransform': 'OTransform',
        'MozTransform': 'MozTransform',
        'webkitTransform': 'webkitTransform'
      };
      for (t in transform) {
        if (el.style[t] !== undefined) {
          return transform[t];
        }
      }
    }

    public whichAnimationEvent() {
      let t, el = document.createElement('fakeelement');
      let animations = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MozAnimation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd'
      };
      for (t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    }

    public whichTransitionEvent() {
      let t, el = document.createElement('fakeelement');
      let transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    }
  }

}
