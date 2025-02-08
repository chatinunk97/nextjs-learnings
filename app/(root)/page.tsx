import SearchForm from "@/components/SearchForm";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  //In next js searchParam is a promise
  const query = (await searchParams).query;
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
    </>
  );
};

export default page;
