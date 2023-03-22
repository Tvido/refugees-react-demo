export const mailValidator = arg => arg ? arg.length >= 8 && arg.length <= 20 : false;

export const passwordValidator = arg => arg ? arg.length >= 8 && arg.length <= 20 : false;

export const companyNameValidator = arg => arg ? arg.length >= 4 && arg.length <= 20 : false;

export const commonValidator = arg => arg ? arg.length >= 4 && arg.length <= 20 : false;

export const salaryValidator = arg => arg ? arg.length >= 4 && arg.length <= 20 : false;

export const errorList = {
	mailValidator: 'Помилка. Довжина від 8 до 20 символів',
	passwordValidator: 'Помилка. Довжина від 8 до 20 символів',
	companyNameValidator: 'Помилка. Довжина від 4 до 20 символів',
	commonValidator: 'Помилка. Довжина від 4 до 20 символів',
	salaryValidator: 'від 4 до 20 символів'
};