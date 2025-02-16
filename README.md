# Next.js Notes

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 1. Routing

### Protecting Routes

- Only `page.tsx` should be accessible within a route folder.

## 2. Navigation

### Client-Side Navigation

- **Avoid using `<a>` tags** for navigation because they cause full-page reloads.
- Use Next.js `Link` component instead for optimized navigation.
- You can observe the difference in the **Network** tab of DevTools.

---

## 3. Client vs Server Components

- **Use server components as much as possible** to reduce JavaScript sent to the client.
- Example: In a product page,
  - Keep **navbar, product list, product card, and footer** as server components.
  - Extract the **Add to Cart button** as a client component if it needs interactivity.

---

## 4. Fetching Data

### Fetching Data in Server Components

- Always **fetch data in server components** unless interactivity requires it on the client.

### Caching and Fetch Strategies

#### **Dynamic Data (Always Fresh)**

```ts
const res = await fetch("https://jsonplaceholder.typicode.com/users", {
  cache: "no-store",
});
```

#### **Revalidated Data (Cached with Expiration)**

```ts
const res = await fetch("https://jsonplaceholder.typicode.com/users", {
  next: { revalidate: 10 },
});
```

- **Axios does not support this caching automatically**, so prefer `fetch` for built-in optimizations.

### Static vs Dynamic Rendering

- **Static Rendering** (default) → Data is fetched at build time.
- **Dynamic Rendering** (explicitly set)
  ```ts
  {
    cache: "no-store";
  } // Forces data to be fetched on each request.
  ```
- **Test this behavior** by displaying a timestamp in the UI while fetching data.

---

## 5. Styling in Next.js

### CSS Modules

- Styles are **scoped** to components.
- Example:
  ```css
  /* ProductCard.module.css */
  .cardContainer {
    padding: 1rem;
    border: 1px solid #ccc;
  }
  ```
- Import and use:
  ```ts
  import style from "./ProductCard.module.css";
  <div className={style.cardContainer}></div>
  ```
- Next.js **automatically generates unique class names** to prevent conflicts.

### Tailwind CSS & DaisyUI

- **DaisyUI** extends Tailwind to make styling **cleaner and easier**. [Learn more](https://daisyui.com/)

### Tailwind Utility Classes

- Define reusable classes in `global.css`:
  ```css
  .heading {
    @apply uppercase bg-black px-6 py-3 font-extrabold text-white text-2xl text-center;
  }
  ```
- Use in components:
  ```ts
  <h1 className="heading">HOMEPAGE</h1>
  ```

---

## 6. Fonts

### Using Local Fonts for Optimization

- **Use `next/font/local` instead of Google Fonts** for better performance.
- Steps:
  1. Place font files inside `/app/fonts`.
  2. Import `localFont`:
     ```ts
     import localFont from "next/font/local";
     ```
  3. Define fonts:
     ```ts
     const workSans = localFont({
       src: [
         { path: "./fonts/WorkSans-Black.ttf", weight: "900", style: "normal" },
         { path: "./fonts/WorkSans-Bold.ttf", weight: "800", style: "normal" },
       ],
       variable: "--font-work-sans",
     });
     ```
  4. Apply globally via `layout.tsx`:
     ```ts
     <body className={`${workSans.variable} antialiased`}>
     ```

---

## 7. Favicons

- Place `favicon.ico` inside `/app/` → Next.js will **automatically use it** as the website icon.

---

## 8. CSS Tricks

### Creating Background Patterns

```css
.pattern {
  background-image: linear-gradient(
    to right,
    transparent 49.5%,
    rgba(251, 232, 67, 0.2) 49.5%,
    rgba(251, 232, 67, 0.6) 50.5%,
    transparent 50.5%
  );
  background-size: 5% 100%;
  background-position: center;
  background-repeat: repeat-x;
}
```

---

## 9. Next.js Syntax & Concepts

### `searchParams` is a Promise

- **In Next.js 15, `searchParams` is asynchronous**, unlike previous versions.
- Example:
  ```ts
  export default async function Page({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) {
    const filters = (await searchParams).filters;
  }
  ```
- **Prior to v15, `searchParams` was synchronous** but will be deprecated in future versions.

## 10. GROQ Query

```
*[_type =="startup" && defined(slug.current) ]{
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id,name,image,bio
    },
    views,
    description,
    category,
    image

}
```

## 11. Generate type based on Sanity Structure

[Check the Document here!](https://www.sanity.io/docs/sanity-typegen)

### Extract type from schema

`npx sanity@latest schema extract --path=./sanity/extract.json`

### Create `sanity-typegeg.json`

```
{
  "path": "./**/*.{ts,tsx,js,jsx}",
  "schema": "./sanity/extract.json",
  "generates": "./sanity.types.ts",
  "overloadClientMethods": true
}
```

### Generate the type

` npx sanity@latest typegen generate`
Be sure to check the previous step whether you are pointing to the right file path

You will find the type file named `sanity.types.ts` in the root folder

Tip You don't have to use all of the properties you can use Omit to exclude some of it out

```
export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };
```

## Live Content API

[Check the doc](https://www.sanity.io/docs/live-content-guide)
This allow your website to get the content immediately when the data is updated on Sanity

### Setup the `live.ts` file

## Use `sanityFetch()` instead of `client.fetch()`

This function can be imported from the `live.ts` file and used just like the `client.fetch()`
It returns the following

```
{
    data: any;
    sourceMap: ContentSourceMap | null;
    tags: string[];
}
```

So you may have to desconstruct it a little like this

```
 const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });
```
### Add the `<SanityLive />` to your page
From the [doc](https://www.sanity.io/docs/live-content-guide)
>The final step to enable the Live Content API is adding the SanityLive React component. It listens for changes in your data and works with your sanityFetch queries to efficiently update content . Include it in application so it renders on any page that needs live content.
---

### XSS Attack and dangerouslySetInnerHTML
This is a type of code injection that injects malicoius scripts in to a website
However, in this case we know what we are injecting in and it's from Sanity so we can be sure about it

## Archieve Code
Normal client fetching
```
  // console.log(JSON.stringify(posts, null, 2));

  // const posts = await client.fetch(STARTUPS_QUERY);
  // const posts = [
  //   {
  //     _createdAt: new Date().toISOString(),
  //     view: 55,
  //     author: { _id: 1, name: "John Doe" },
  //     _id: 1,
  //     description: "This is a description",
  //     title: "This is a title",
  //     image: "https://placehold.co/150",
  //     category: "Robots",
  //   },
  // ];
```

## Summary

| Feature            | Key Points                                                |
| ------------------ | --------------------------------------------------------- |
| Routing            | Protect route files; use `page.tsx` only                  |
| Navigation         | Use `Link` instead of `<a>`                               |
| Client vs Server   | Keep most components on the server, extract interactivity |
| Data Fetching      | Use server components, `fetch` for caching                |
| CSS Modules        | Scoped styles for components                              |
| Tailwind & DaisyUI | Cleaner Tailwind styling                                  |
| Fonts              | Use `next/font/local` for optimization                    |
| Favicons           | Place `favicon.ico` in `/app/`                            |
| CSS Tricks         | Custom background patterns                                |
| `searchParams`     | Now a **Promise** in Next.js 15                           |

---
