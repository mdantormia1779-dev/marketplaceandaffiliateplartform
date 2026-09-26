"use client";

import { useMemo, useState } from "react";
import LinksHeader from "./AllLikeComponents/LinksHeader";
import LinksFilterBar from "./AllLikeComponents/LinksFilterBar";
import LinksTable from "./AllLikeComponents/LinksTable";
import { AFFILIATE_LINKS } from "./AllLikeComponents/linksData";
import type {
  AffiliateLink,
  SortOption,
  StatusFilter,
} from "./AllLikeComponents/types";

const AllLink = () => {
  const [links, setLinks] = useState<AffiliateLink[]>(AFFILIATE_LINKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const handleDeleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const visibleLinks = useMemo(() => {
    let result = [...links];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (link) =>
          link.productName.toLowerCase().includes(q) ||
          link.affiliateUrl.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((link) => link.status === statusFilter);
    }

    switch (sortOption) {
      case "newest":
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "mostClicks":
        result.sort((a, b) => b.clicks - a.clicks);
        break;
      case "highestCommission":
        result.sort((a, b) => b.commission - a.commission);
        break;
    }

    return result;
  }, [links, searchQuery, statusFilter, sortOption]);

  return (
    <div>
      <LinksHeader />

      <LinksFilterBar
        totalCount={links.length}
        shownCount={visibleLinks.length}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      <LinksTable links={visibleLinks} onDeleteLink={handleDeleteLink} />
    </div>
  );
};

export default AllLink;