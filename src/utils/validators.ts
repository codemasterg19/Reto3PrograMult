/**
 * Utilidades de validación para formularios
 */

/**
 * Valida formato de correo electrónico
 * @param email Correo a validar
 * @returns true si el formato es válido
 */
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida que un campo no esté vacío
 * @param value Valor a validar
 * @returns true si el campo tiene contenido
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
