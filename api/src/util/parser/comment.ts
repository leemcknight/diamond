export function parseComment(commentString: string): string {
  return commentString.split(",")[1].replace(/"/g, "").replace("$", "");
}
