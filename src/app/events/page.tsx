
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Event } from "@/types/event";
import { getEvents } from "@/services/eventServices";
import type { EventFilters } from "@/services/eventServices";

const EVENTS_PER_PAGE = 5;

export default function EventPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  // Search state
  const [search, setSearch] = useState("");

  // Filter states
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isPublished, setIsPublished] = useState("");
  const [sortBy, setSortBy] = useState<"eventDate" | "title">("eventDate");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        setError(null);

        const filters: EventFilters = {
          page: 1,
          limit: EVENTS_PER_PAGE,
          category: category || undefined,
          location: location || undefined,
          isPublished:
            isPublished === "" ? undefined : isPublished === "true",
          sortBy,
          order,
        };

        // Fetch the first page
        const firstPage = await getEvents(filters);

        let allEvents = [...firstPage.items];

        // Fetch the remaining pages
        for (let currentPage = 2;
          currentPage <= firstPage.totalPages;
          currentPage++
        ) {
          const data = await getEvents({
            ...filters,
            page: currentPage,
          });

          allEvents = [...allEvents, ...data.items];
        }

        setEvents(allEvents);
      } catch {
        setError("Unable to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [category, location, isPublished, sortBy, order]);

  // Search event titles on the frontend
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Calculate frontend pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / EVENTS_PER_PAGE)
  );

  // Display only five events on the current page
  const startIndex = (page - 1) * EVENTS_PER_PAGE;

  const displayedEvents = filteredEvents.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  function resetPage() {
    setPage(1);
  }

  function goToPreviousPage() {
    setPage((current) => Math.max(1, current - 1));
  }

  function goToNextPage() {
    setPage((current) => Math.min(totalPages, current + 1));
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold text-slate-900">
          Campus Events
        </h1>

        <p className="mb-8 text-base text-slate-600">
          Discover upcoming events happening on campus.
        </p>

        {/* Search and Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-3">

          {/* Title Search */}
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Search by title
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              placeholder="Enter event title..."
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-700"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                resetPage();
              }}
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-700"
            >
              <option value="">All categories</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="social">Social</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                resetPage();
              }}
              placeholder="Search by location..."
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-700"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Publication status
            </label>
            <select
              value={isPublished}
              onChange={(e) => {
                setIsPublished(e.target.value);
                resetPage();
              }}
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-700"
            >
              <option value="">All events</option>
              <option value="true">Published</option>
              <option value="false">Unpublished</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as "eventDate" | "title");
                resetPage();
              }}
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-700"
            >
              <option value="eventDate">Event date</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Sort order
            </label>
            <select
              value={order}
              onChange={(e) => {
                setOrder(e.target.value as "asc" | "desc");
                resetPage();
              }}
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-700"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearch("");
                setCategory("");
                setLocation("");
                setIsPublished("");
                setSortBy("eventDate");
                setOrder("asc");
                setPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-slate-100 p-3 font-semibold text-slate-700 hover:bg-slate-200"
            >
              Clear filters
            </button>
          </div>
        </div>

        {loading ? (
          <p className="py-10 text-center text-slate-600">
            Loading events...
          </p>
        ) : error ? (
          <p className="py-10 text-center text-red-600">{error}</p>
        ) : filteredEvents.length === 0 ? (
          <p className="py-10 text-center text-slate-600">
            No matching events found. Try changing your search or filters.
          </p>
        ) : (
          <>
            <p className="mb-5 text-sm text-slate-600">
              Showing {displayedEvents.length} of {filteredEvents.length} events
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h2 className="text-xl font-bold text-slate-900">
                        {event.title}
                      </h2>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          event.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {event.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>

                    <p className="text-base leading-7 text-gray-700">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-2 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {event.location}
                      </p>

                      <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(event.eventDate).toLocaleString()}
                      </p>

                      <p>
                        <span className="font-semibold">Category:</span>{" "}
                        {event.category}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-5">
              <button
                onClick={goToPreviousPage}
                disabled={page === 1}
                className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="font-medium text-slate-700">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={page >= totalPages}
                className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
