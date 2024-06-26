import React, { useState, useEffect } from "react";
import { fetchContents } from "../services/contentService";
import LoaderComponent from "./LoaderComponent";

const ContentList: React.FC = () => {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const loadContents = async () => {
      try {
        const data = await fetchContents(page, pageSize);
        setContents(data.list);
      } catch (error) {
        setError("Failed to fetch contents.");
      } finally {
        setLoading(false);
      }
    };

    loadContents();
  }, [page, pageSize]);

  if (loading) {
    return <LoaderComponent />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Contents</h1>
      {contents.length > 0 ? (
        <ul>
          {contents.map((content) => (
            <li key={content._id}>
              <h2>{content.title}</h2>
              <p>{content.body}</p>
              <p>Author: {content.author}</p>
              <p>Tags: {content.tags.join(", ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contents found.</p>
      )}
      {/* Agregar botones para paginación */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={contents.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContentList;
