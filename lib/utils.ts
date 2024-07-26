import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert object to FormData (For Handle values of useForm to server action)
// export function getFormData(object: { [key: string]: number | string }): FormData {
export function getFormData(object: Record<string, any>): FormData {
  const formData = new FormData();

  for (const key in object) {
    formData.append(key, object[key].toString());
  }

  return formData;
}

export function objectToFormData(object: Record<any, any>): FormData {
  const formData = new FormData();

  formData.append("data", JSON.stringify(object));

  return formData;
}

export function formDataToObject(formData: FormData) {
return JSON.parse(formData.get("data") as string);
}