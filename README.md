This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Next.js Notes

## Routing
Protects other file in the route folder user will be able to access the page.tsx only


## Client side navigation
DON"T Use anchor
`<a>` for navigation is not ideal
It reloads everything in the page all again
Therefore we use Link component that Next defines for us
(you can check the behavior on the network tab)


## Client vs Server
We want to use as less client side component as we can
So if you have a product page with components like 
- navbar 
- product list 
- product card 
- footer 

We can put them ALL in the server
except you can extract the product card's addtoCart button to be a client side component
you see you don't have to move the whole product card to the client side just break it down to small pieces

## Fetch data in server component!


## Caching and fresh data
 - Keep data fresh all the time
```
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    {cache: "no-store"}
  ).then((data) => data);
  ```

- Let Next cache your data
```
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  }).then((data) => data);
  ```
this is only implemented in fetch so axios will not automatically have this

## Server side
has 2 types
- Static  (at build time)
- Dynamic (at request time)

If you did specify anything `( { } )` when fetching, Next js will treat it as a Static page
which will be rendered only once when building
but if you set `{cache: "no-store"}`  it will by dynamic

( see the behavior by having a time stamp show on UI while fetching in that component )

## CSS Module 
CSS file scoped to a component
ProductCard.module.css
inside we can define css like normal
```
.cardContainer {
   padding : 1 rem;
   border: 1px solod #ccc
}
```
THEN we can import the file as style
import style from `./ProductCard.module.css`
then we can use it just like a normal JS object
```style.cardContainer```

This will make our class cleaner
(
the class name in the browser would be like   cardContainer_AIK98cmks 
it adds a random string to make it unique because we can have multiple moudles that has the same class name
)

## Daisyui
This makes tailwind much cleaner MUST USE !!
https://daisyui.com/


## Setting up fonts
```
import localFont from "next/font/local";
```
Use next js localFont function so setup your local font.
It's better for optimization because the font is loaded from local so you don't have to reach out to google

- Setup your font files in side `app/fonts` 

- Import `localFont` 

- Create a variable to store the `NextFontWithVariable` returned from `localFont` 

- Pass in arguments like this 
```
const workSans = localFont({
  src: [

    { path: "./fonts/WorkSans-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/WorkSans-Bold.ttf", weight: "800", style: "normal" },

    ... // and so on
  ],
  //This variable will decide which CLASS will set this font up
  variable: "--font-work-sans",
});

```

- Now you can use it like a normal class. If you apply this to the loot layout (which is created when you setup Next js) it will effect all of the element inside your website

```
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

```

Notes about this layout.tsx it is where you define you basic configuration of the website like metadata, title , descriptions etc


## Favicon
Having `favicon.ico` inside your `/app` directory, next js will automatically use it as the icon of the website