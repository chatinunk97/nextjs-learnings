import { title } from "process";
import SearchForm from "../../components/SearchForm";
import React from "react";
import StartupCard from "../../components/StartupCard";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  //In next js searchParam is a promise
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date().toISOString(),
      view: 55,
      author: { _id: 1, name: "John Doe" },
      _id: 1,
      description: "This is a description",
      title: "This is a title",
      image: "https://placehold.co/150",
      category: "Robots",
    },
  ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post._id} post={post} />)
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default page;
