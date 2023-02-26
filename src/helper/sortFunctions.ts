// sort by Most Upvotes

export const sortByUpvotes = (a: any, b: any) => b.upvotes - a.upvotes;

// sort by Least Upvotes

export const sortByLeastUpvotes = (a: any, b: any) => a.upvotes - b.upvotes;

// sort by Most Comments

export const sortByComments = (a: any, b: any) =>
  b.comments.length - a.comments.length;

// sort by Least Comments

export const sortByLeastComments = (a: any, b: any) =>
  a.comments.length - b.comments.length;
