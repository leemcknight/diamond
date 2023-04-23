export function safeDateString(d?: Date): string {
  if (d) {
    return d.toString();
  } else {
    return "";
  }
}
