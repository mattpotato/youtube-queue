import React, { useMemo } from "react";
import { FlatList, View, Text } from "react-native";
import { Item, SearchResult } from "../types";
import VideoItem from "./VideoItem";

interface SearchResultsListProps {
  data: SearchResult[];
  handleEndReached:
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  data,
  handleEndReached,
}) => {
  const itemsData = useMemo(() => {
    let items: Item[] = [];
    data?.forEach((searchResult) =>
      searchResult?.items?.map((item) => items.push(item))
    );
    return items;
  }, [data]);
  return (
    <FlatList
      data={itemsData}
      renderItem={({ item }) => <VideoItem item={item} />}
      keyExtractor={(item, index) => item.id.videoId + index}
      onEndReached={handleEndReached}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 0.5,
            width: "100%",
            backgroundColor: "#000",
            opacity: 0.2,
          }}
        />
      )}
    />
  );
};
