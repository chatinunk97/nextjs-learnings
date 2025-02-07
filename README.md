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