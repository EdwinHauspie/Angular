import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appTrimOnBlur]'
})
export class TrimOnBlurDirective {
    constructor(private ngControl: NgControl) { }

    @HostListener('blur')
    onBlur() {
        const trimmedValue = this.ngControl.value?.trim();
        this.ngControl.control.setValue(trimmedValue);
    }
}
