"use client";

import { useState } from "react";
import LinksHeader from "./AllLikeComponents/LinksHeader";
import LinksFilterBar from "./AllLikeComponents/LinksFilterBar";
import LinksTable from "./AllLikeComponents/LinksTable";
import { AFFILIATE_LINKS } from "./AllLikeComponents/linksData";
import type { AffiliateLink } from "./AllLikeComponents/types";

const AllLink = () => {
  const [links, setLinks] = useState<AffiliateLink[]>(AFFILIATE_LINKS);

  const handleDeleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <div>
      <LinksHeader />

      <LinksFilterBar totalCount={links.length} shownCount={links.length} />

      <LinksTable links={links} onDeleteLink={handleDeleteLink} />
    </div>
  );
};

export default AllLink;