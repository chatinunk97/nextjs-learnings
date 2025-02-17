import SearchForm from "../../components/SearchForm";
import React from "react";
import StartupCard, { StartupTypeCard } from "../../components/StartupCard";
import { client } from "../../sanity/lib/client";
import { STARTUPS_QUERY } from "../../sanity/lib/query";
import { sanityFetch, SanityLive } from "../../sanity/lib/live";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  //In next js 15 searchParam is a promise
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
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
            posts.map((post: StartupTypeCard) => {
              return <StartupCard key={post._id} post={post} />;
            })
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
};

export default page;
