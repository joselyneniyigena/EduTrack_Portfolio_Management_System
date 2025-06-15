import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AuthValidators {
    static passwordMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            return { passwordMismatch: true };
        }
        return null;
    }

    static strongPassword(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) return null;

        const hasNumber = /[0-9]/.test(value);
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasSpecial = /[#?!@$%^&*-]/.test(value);
        const minLength = value.length >= 8;

        const errors: any = {};

        if (!minLength) errors.minLength = true;
        if (!hasNumber) errors.requiresDigit = true;
        if (!hasUpper) errors.requiresUppercase = true;
        if (!hasLower) errors.requiresLowercase = true;
        if (!hasSpecial) errors.requiresSpecialChars = true;

        return Object.keys(errors).length ? errors : null;
    }

    static noWhitespace(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value && value.trim().length === 0) {
            return { whitespace: true };
        }
        return null;
    }

    static usernameValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) return null;

        const validPattern = /^[a-zA-Z0-9._-]+$/.test(value);
        const minLength = value.length >= 3;
        const maxLength = value.length <= 20;

        const errors: any = {};

        if (!validPattern) errors.invalidCharacters = true;
        if (!minLength) errors.tooShort = true;
        if (!maxLength) errors.tooLong = true;

        return Object.keys(errors).length ? errors : null;
    }

    static phoneValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) return null;

        const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phonePattern.test(value)) {
            return { invalidPhone: true };
        }
        return null;
    }
}