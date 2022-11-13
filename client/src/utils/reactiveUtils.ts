/* resolve reactive value can't assigned by normal value in script setup suger
 *  set value for reactive form
 */
export function setReactiveValue<K extends keyof T, T>(form: T, row: T): void {
  if (!form || !row) {
    return;
  }
  Object.keys(row).forEach((fItem: string) => {
    Object.keys(form).forEach((sItem: string) => {
      if (fItem === sItem) {
        form[sItem as K] = row[sItem as K];
      }
    });
  });
}
